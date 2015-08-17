interface IBootstrpGrowlOptions {
	ele: string;
	type: string;
	offset: {
		from: string;
		amount: number;
	}	
	align: string;
	width: number;
	delay: number;
	allow_dismiss: boolean;
	stackup_spacing: number;
}

interface JQuery {
	bootStrapGrowl(mesage: string, options: IBootstrpGrowlOptions ): JQuery
}

export { JQueryStatic, IBootstrpGrowlOptions};