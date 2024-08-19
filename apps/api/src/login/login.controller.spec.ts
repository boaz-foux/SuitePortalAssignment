/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { OK_JSON, ADMIN, LOGIN_COOKIE_NAME, OK_JSON_STRING } from './login.config';

describe('LoginController', () => {
    let controller: LoginController;

    let mockService: LoginService;

    beforeEach(async () => {
        mockService = {} as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [LoginController],
            providers: [
                { provide: LoginService, useValue: mockService },
            ]
        }).compile();

        controller = module.get<LoginController>(LoginController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });


    it('get login check should return ok', async () => {
        const result = await controller.isLoggedIn({});
        expect(result).toEqual(OK_JSON);
    });

    it('get login check should return ok', async () => {
        const token = Math.random().toString(34);
        mockService.login = jest.fn().mockResolvedValue(token);
        const res = {
            cookie: jest.fn().mockResolvedValue(true),
            end: jest.fn().mockResolvedValue(true),
        };
        await controller.login(ADMIN, res);
        expect(res.cookie).toHaveBeenNthCalledWith(1, LOGIN_COOKIE_NAME, token, { httpOnly: true });
        expect(res.end).toHaveBeenNthCalledWith(1, OK_JSON_STRING);
    });
});