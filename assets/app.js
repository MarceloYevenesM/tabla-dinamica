const selectorTabla = document.querySelector(".table-body");
const selectorNacionalidad = document.querySelector(".selectNacionalidad");
const selectEstadoCivil = document.querySelector(".estadoCivil");

const personas = [
  {
    nombre: "Marcelo",
    edad: 26,
    pais: "Chile",
    "estado-civil": "Soltero",
    genero: "Masculino",
    activo: "S",
  },
  {
    nombre: "Jose",
    edad: 45,
    pais: "Argentina",
    "estado-civil": "Casado",
    genero: "Masculino",
    activo: "N",
  },
  {
    nombre: "Pedro",
    edad: 14,
    pais: "Chile",
    "estado-civil": "Soltero",
    genero: "Masculino",
    activo: "S",
  },
  {
    nombre: "Josefa",
    edad: 18,
    pais: "Brasil",
    "estado-civil": "Viudo",
    genero: "Femenino",
    activo: "S",
  },
  {
    nombre: "Valentina",
    edad: 10,
    pais: "Argentina",
    "estado-civil": "Soltero",
    genero: "Femenino",
    activo: "S",
  },
];

const filtros = {
  nacionalidad: "",
  edad: "",
  pais: "",
  "estado-civil": "",
  buscador: "",
};

selectorNacionalidad.addEventListener("change", (e) => {
  filtros.nacionalidad = e.target.value === "todos" ? "" : e.target.value;
  aplicarFiltro(filtros);
});

selectEstadoCivil.addEventListener("change", (e) => {
  filtros['estado-civil'] = e.target.value === "todos" ? "" : e.target.value;
  aplicarFiltro(filtros);
});

const crearPersonas = (personas) => {
  for (const personaIterator of personas) {
    const persona = crearPersona(personaIterator);
    selectorTabla.append(persona);
  }
};

const crearPersona = (persona) => {
  const { nombre, edad, pais, genero, activo } = persona;
  const personaElement = document.createElement("tr");
  personaElement.append(crearAtributoPersona(nombre));
  personaElement.append(crearAtributoPersona(edad));
  personaElement.append(crearAtributoPersona(pais));
  personaElement.append(crearAtributoPersona(persona["estado-civil"]));
  personaElement.append(crearAtributoPersona(genero));
  personaElement.append(crearAtributoPersona(activo));

  return personaElement;
};

const crearAtributoPersona = (valor) => {
  const atributoPersona = document.createElement("td");
  atributoPersona.innerHTML = valor;
  return atributoPersona;
};

const borrarTabla = () => {
  selectorTabla.innerHTML = "";
};

const aplicarFiltro = (filtros) => {
  const personasFiltradas = personas
    .filter((persona) => {
      const { pais } = persona;
      if (filtros.nacionalidad === "") {
        return true;
      } else {
        return pais.toLocaleLowerCase() === filtros.nacionalidad;
      }
    })
    .filter((persona) => {
      
      const estadoCivil  = persona['estado-civil'];
      console.log(filtros)
      if (filtros['estado-civil'] === "") {
        return true;
      } else {
        
        return estadoCivil.toLocaleLowerCase() === filtros['estado-civil'];
      }
    });

  borrarTabla();
  crearPersonas(personasFiltradas);
};

crearPersonas(personas);
