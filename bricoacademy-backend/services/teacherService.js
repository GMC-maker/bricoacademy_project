// services/teacherService.js
// Servicio para interactuar con el modelo Sequelize `Profesores`

// Recupera la función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crea la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Carga las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recupera el modelo director
const Teacher = models.teacher;

class TeacherService {
	async getAllTeachers() {
		// Devuelve todos los profesores.
		const result = await Teacher.findAll();
		return result;
	}

	// Devuelve un teacher por su id
	async getTeacherById(id_teacher) {
		const result = await Teacher.findByPk(id_teacher);
		return result;
	}

	//Crea un teacher
	async createTeacher(teacher) {
		const result = await Teacher.create(teacher);
		return result;
	}
	//Borrar un teacher
	async deleteTeacher(id_teacher) {
		const numFilas = await Teacher.destroy({
			where: { id_teacher: id_teacher },
		});
		return numFilas;
	}

	//Actualizar un teacher
	async updateTeacher(teacher) {
		let numFilas = await Teacher.update(teacher, {
			where: { id_teacher: teacher.id_teacher },
		});

		// Si el numero de filas afectadas por la actualización es cero
		// y existe el registro para ese profesor, es que no hay cambios en los datos
		// la actualización

		if (numFilas == 0 && (await Teacher.findByPk(teacher.id_teacher))) {
			numFilas = 1; // Devuelvo uno para indicar que todo ha ido bien
		}
		return numFilas;
	}
}

module.exports = new TeacherService();
