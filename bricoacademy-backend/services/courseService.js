// services/courseService.js
// Servicio para interactuar con el modelo Sequelize `Cursos`

// Recupera la función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crea la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Carga las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recupera el modelo director
const Course = models.course;

class CourseService {
	async getAllCourses() {
		// Devuelve todos los cursos.
		const result = await Course.findAll();
		return result;
	}

	// Devuelve un course por su id
	async getCourseById(id_course) {
		const result = await Course.findByPk(id_course);
		return result;
	}

	//Crea un curso
	async createCourse(course) {
		const result = await Course.create(course);
		return result;
	}
	//Borrar un course
	async deleteCourse(id_course) {
		const numFilas = await Course.destroy({
			where: { id_course: id_course },
		});
		return numFilas;
	}

	//Actualizar un course
	async updateCourse(course) {
		let numFilas = await Course.update(course, {
			where: { id_course: course.id_course },
		});

		// Si el numero de filas afectadas por la actualización es cero
		// y existe el registro para ese curso, es que no hay cambios en los datos
		// la actualización

		if (numFilas == 0 && (await Course.findByPk(course.id_course))) {
			numFilas = 1; // Devuelvo uno para indicar que todo ha ido bien
		}
		return numFilas;
	}
}

module.exports = new CourseService();
