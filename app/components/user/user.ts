interface IUserCompany {
	name?: string;
	email?: string;
	phoneNumber?: string;
	address?: string;
	website?: string;
}

interface IUser {
	username? : string;
	email?: string;
	userCompany?: IUserCompany 
}

export { IUser, IUserCompany };