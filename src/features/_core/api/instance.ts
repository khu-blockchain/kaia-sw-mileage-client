import ky, { KyInstance } from 'ky';
import { useStudentStore } from '@/features/student/store';
const baseURL = 'http://khunggum.khu.ac.kr:8080/v1/';

const baseApi = ky.create();

const authApi =  ky.create({
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => {
        // insert access token to header
        const {getToken} = useStudentStore.getState().actions;
        const token = getToken()[0].token;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

const server = (api: KyInstance) => (route: string) => {
  return api.extend({
    prefixUrl: `${baseURL}${route}/`
  });
};

const baseServer = server(baseApi);
const authServer = server(authApi);

const AuthServer = baseServer('auth');
const StudentServer = authServer('students');
const AcademicFieldServer = authServer('academic-field');
const SwMileageServer = authServer('sw-mileages');
const SwMileageTokenServer = authServer('sw-mileage-tokens');
const SwMileageTokenHistoryServer = authServer('sw-mileage-token-histories');
const WalletServer = authServer('wallet');

export {
  AuthServer,
  StudentServer,
  AcademicFieldServer,
  SwMileageServer,
  SwMileageTokenServer,
  SwMileageTokenHistoryServer,
  WalletServer,
}

