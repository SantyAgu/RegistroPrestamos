export class Cliente{
	public id:number;
	public nombre:string;
	public apellido:string;
	public fechaNacimiento:Date;

	constructor(){
		this.id=0;
		this.nombre="";
		this.apellido="";
		this.fechaNacimiento=new Date();
	}
}