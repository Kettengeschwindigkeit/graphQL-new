import { ConfigService } from "@nestjs/config";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const getMySqlDbConfig = async (
	configService: ConfigService
): Promise<MysqlConnectionOptions> => ({
	type: configService.get("DB_CONNECTION"),
	host: configService.get("DB_HOST"),
	port: configService.get("DB_PORT"),
	database: configService.get("DB_NAME"),
	username: configService.get("DB_USERNAME"),
	password: configService.get("DB_PASSWORD"),
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	migrations: [__dirname + "/../**/*.migration{.ts,.js}"],
	synchronize: true
});
