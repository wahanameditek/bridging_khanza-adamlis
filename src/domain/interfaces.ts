import { RegistrasiRow, TindakanRow, PayloadItem } from './models';

export interface IRegistrationRepository {
  findByNoRegistrasiLike(noRegLike: string, limit: number): Promise<RegistrasiRow[]>;
}

export interface ITindakanRepository {
  findByRegistrasiList(noRegList: string[]): Promise<TindakanRow[]>;
}

export interface IRegistrationService {
  getRegistrationPayload(noRegLike: string, limit: number): Promise<PayloadItem[]>;
}
