import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {User} from '../entity/User';

export class CreateAdminUser1572547308077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User();
    if (
      !process.env.ADMIN_USERNAME ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.ADMIN_ROLE
    ) {
      throw new Error(
        'ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_ROLE environment variables are required',
      );
    }
    user.username = process.env.ADMIN_USERNAME;
    user.password = process.env.ADMIN_PASSWORD;
    user.hashPassword();
    user.role = process.env.ADMIN_ROLE;
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
