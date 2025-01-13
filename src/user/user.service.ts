import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
	constructor() {}

	async getAll() {
		// return [
		// 	{
		// 		_id: 1,
		// 		name: "Max"
		// 	}
		// ];
		return "String";
	}
}
