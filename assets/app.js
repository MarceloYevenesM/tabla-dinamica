(() => {
  const selectorTabla = document.querySelector(".table-body");
  const selectorNacionalidad = document.querySelector(".selectNacionalidad");
  const selectEstadoCivil = document.querySelector(".estadoCivil");
  const checkEsMayorEdad = document.querySelector(".esMayorEdad");
  const buscador = document.querySelector(".buscar");

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
    esMayorEdad: "",
    "estado-civil": "",
    buscador: "",
  };

  selectorNacionalidad.addEventListener("change", (e) => {
    filtros.nacionalidad = e.target.value === "todos" ? "" : e.target.value;
    aplicarFiltro(filtros);
  });

  selectEstadoCivil.addEventListener("change", (e) => {
    filtros["estado-civil"] = e.target.value === "todos" ? "" : e.target.value;
    aplicarFiltro(filtros);
  });

  checkEsMayorEdad.addEventListener("change", (e) => {
    filtros.esMayorEdad = e.target.checked;
    aplicarFiltro(filtros);
  });

  buscador.addEventListener("input", (e) => {
    filtros.buscador = e.target.value.trim();
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
        const estadoCivil = persona["estado-civil"];
        if (filtros["estado-civil"] === "") {
          return true;
        } else {
          return estadoCivil.toLocaleLowerCase() === filtros["estado-civil"];
        }
      })
      .filter((persona) => {
        if (filtros.esMayorEdad) {
          return persona.edad >= 18;
        } else {
          return true;
        }
      })
      .filter((persona) => {
        const { nombre, edad, pais, genero, activo } = persona;

        if (filtros.buscador == "") {
          return true;
        } else {
          return (
            nombre
              .toLocaleLowerCase()
              .includes(filtros.buscador.toLocaleLowerCase()) ||
            edad
              .toString()
              .toLocaleLowerCase()
              .includes(filtros.buscador.toLocaleLowerCase()) ||
            pais
              .toLocaleLowerCase()
              .includes(filtros.buscador.toLocaleLowerCase()) ||
            genero
              .toLocaleLowerCase()
              .includes(filtros.buscador.toLocaleLowerCase()) ||
            activo
              .toLocaleLowerCase()
              .includes(filtros.buscador.toLocaleLowerCase()) ||
            persona["estado-civil"]
              .toLocaleLowerCase()
              .includes(filtros.buscador.toLocaleLowerCase())
          );
        }
      });

    borrarTabla();
    crearPersonas(personasFiltradas);
  };

  crearPersonas(personas);
})();
