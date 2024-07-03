import { Time } from '@/utils/constants';

export const config = {
  db: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,

    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',

    entities: [`${__dirname}/../../api/**/*.entity.{js,ts}`],

    logging: false,
    synchronize: false,
    autoLoadEntities: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  token: {
    resetPassword: {
      lifetime: 5 * Time.ONE_MINUTE,
    },
    verifyEmail: {
      lifetime: 5 * Time.ONE_MINUTE,
    },
  },
  email: {
    transport: {
      secure: false,
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.MAIL_USERNAME || 'username',
        pass: process.env.MAIL_PASSWORD || 'password',
      },
    },
    options: {
      from: `"GForm" <${process.env.MAIL_USERNAME}>`,
    },
  },

  firebaseAuth: {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDE_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  },

  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },

  url: {
    fe: {
      baseUrl: process.env.FE_BASE_URL,
      pathVerifyEmail: process.env.FE_PATH_VERIFY_EMAIL,
      pathResetPassword: process.env.FE_PATH_RESET_PASSWORD,
    },
  },
};
