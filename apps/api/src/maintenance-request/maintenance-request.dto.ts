import {
  ALL_SERVICE_TYPES,
  MaintenanceRequest,
  ServiceType
} from '@suiteportal/api-interfaces';

import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
} from 'class-validator';

type Ensure = {
  [KEY in keyof MaintenanceRequest]: any;
}

export class maintenanceRequestDto implements Ensure {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  unitNumber: string;

  @IsNotEmpty()
  @Matches(`^${ALL_SERVICE_TYPES.join('|')}$`, '')
  serviceType: ServiceType;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  details?: string;
}