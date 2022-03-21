import { getConfig } from 'src/configs';

export const jwtConstants = {
  secret: getConfig().get('jwt_secret_key'),
};
