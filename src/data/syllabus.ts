export const syllabusData = [
  {
    id: 1,
    classname: "Cálculo I",
    description:
      "Es un curso básico dedicado al estudio de funciones de una variable real, indispensable para la construcción de conocimiento en asignaturas subsecuentes de carreras de ingeniería y ciencias de Yachay Tech. La primera parte abarca el concepto de límite, derivada y aplicaciones sencillas en la solución de problemas de optimización. Posteriormente se estudia antiderivadas, la integral de Riemann, técnicas de integración y se consideran aplicaciones en el cálculo de áreas planas.",
    units: [
      {
        name: "Límites y Continuidad",
        topics: [
          {
            name: "Repaso de Funciones Reales",
            description:
              "Revisión de los conceptos fundamentales de funciones reales, incluyendo dominios, rangos, y tipos de funciones comunes como polinomios, racionales, exponenciales y logarítmicas.",
          },
          {
            name: "Definición e interpretación de límite",
            description:
              "Introducción al concepto de límite de una función en un punto. Interpretación gráfica y analítica, así como la importancia de los límites en el análisis matemático.",
          },
          {
            name: "Límites al infinito. Teoremas sobre límites. Cálculo de límites",
            description:
              "Estudio de los límites cuando la variable independiente tiende al infinito. Presentación y aplicación de teoremas fundamentales sobre límites para resolver problemas prácticos.",
          },
          {
            name: "Continuidad. Teoremas sobre continuidad.",
            description:
              "Examen del concepto de continuidad de una función en un punto y en un intervalo. Estudio de los teoremas claves de continuidad, incluyendo el teorema del valor intermedio.",
          },
        ],
      },
      {
        name: "La Derivada",
        topics: [
          {
            name: "Definición e interpretaciones de la derivada. Teoremas de derivabilidad.",
            description:
              "Definición formal de la derivada de una función y sus interpretaciones físicas y geométricas. Teoremas que establecen condiciones para la derivabilidad de funciones.",
          },
          {
            name: "Reglas de derivación. Regla de la cadena. Derivación implícita y logarítmica.",
            description:
              "Reglas básicas de derivación, incluyendo la regla del producto, la regla del cociente y la regla de la cadena. Técnicas avanzadas como la derivación implícita y logarítmica.",
          },
          {
            name: "Teoremas de Rolle y del valor Medio",
            description:
              "Enunciado y demostración de los teoremas de Rolle y del valor medio, con aplicaciones prácticas en problemas de análisis.",
          },
          {
            name: "Derivadas de orden superior. Regla de L'Hopital.",
            description:
              "Introducción a las derivadas de orden superior y su interpretación. Aplicación de la regla de L'Hopital para resolver límites indeterminados.",
          },
          {
            name: "Aplicaciones de la derivada: trazado de gráficas de funciones, problemas de optimización",
            description:
              "Uso de la derivada para el trazado de gráficas de funciones, identificación de máximos y mínimos, y resolución de problemas de optimización en contextos diversos.",
          },
        ],
      },
      {
        name: "Integración",
        topics: [
          {
            name: "Antiderivadas",
            description:
              "Definición y cálculo de antiderivadas o integrales indefinidas. Propiedades y técnicas básicas de integración.",
          },
          {
            name: "Sumas de Riemann e integral definida",
            description:
              "Concepto de suma de Riemann como aproximación al área bajo una curva. Definición y propiedades de la integral definida.",
          },
          {
            name: "Teorema fundamental del cálculo",
            description:
              "Enunciado y aplicación del teorema fundamental del cálculo que relaciona la derivada con la integral de una función.",
          },
          {
            name: "Teorema del valor medio para integrales",
            description:
              "Estudio del teorema del valor medio para integrales y sus implicaciones en el análisis de funciones.",
          },
          {
            name: "Técnicas de Integración: sustitución, integración por partes, fracciones parciales",
            description:
              "Métodos avanzados de integración, incluyendo sustitución, integración por partes y descomposición en fracciones parciales.",
          },
          {
            name: "Área y volúmenes entre curvas",
            description:
              "Cálculo de áreas entre curvas y volúmenes de sólidos de revolución utilizando la integración.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    classname: "Álgebra Lineal",
    description:
      "El Álgebra Lineal es un área fundamental de la matemática. Son muchas sus aplicaciones en distintas áreas del conocimiento. En este curso se busca transmitir a los estudiantes las herramientas básicas del Álgebra Lineal, indispensables para la construcción de conocimientos en algunas asignaturas en las carreras de Ingeniería y Ciencias de Yachay Tech. El curso se inicia con el estudio de las matrices y los sistemas de ecuaciones. La solución de sistemas de ecuaciones es la herramienta fundamental del curso. Se presentará una introducción tanto a los espacios vectoriales como a las transformaciones lineales. Finalmente, se tratan los temas de autovalores y diagonalización.",
    units: [
      {
        name: "Cálculo Matricial",
        topics: [
          {
            name: "Matrices. Operaciones con matrices.",
            description:
              "Introducción a las matrices y sus operaciones básicas como adición, sustracción y multiplicación.",
          },
          {
            name: "Producto vectorial y matricial.",
            description:
              "Estudio del producto vectorial y matricial, y sus propiedades fundamentales.",
          },
          {
            name: "Matrices, operaciones y propiedades.",
            description:
              "Análisis detallado de diversas operaciones y propiedades de las matrices, incluyendo la inversa y la transpuesta.",
          },
          {
            name: "Inversa de una matriz cuadrada, transpuesta de una matriz.",
            description:
              "Métodos para encontrar la inversa de matrices cuadradas y sus aplicaciones prácticas.",
          },
          {
            name: "Matrices elementales y matrices inversas.",
            description:
              "Descripción y uso de matrices elementales y su relación con matrices inversas.",
          },
          {
            name: "Determinantes.",
            description:
              "Definición y cálculo de determinantes de matrices, junto con sus propiedades.",
          },
          {
            name: "Propiedades de los Determinantes.",
            description:
              "Análisis de las propiedades de los determinantes y su aplicación en la resolución de sistemas de ecuaciones.",
          },
          {
            name: "Dos Ecuaciones lineales con dos incógnitas, Sistemas de m ecuaciones con n incógnitas.",
            description:
              "Solución de sistemas de ecuaciones lineales con dos incógnitas y la generalización a sistemas con m ecuaciones y n incógnitas.",
          },
          {
            name: "Sistemas homogéneos de ecuaciones.",
            description:
              "Estudio de sistemas de ecuaciones homogéneos y sus soluciones.",
          },
          {
            name: "Matrices y Sistemas de ecuaciones, Regla de Cramer.",
            description:
              "Aplicación de matrices en la resolución de sistemas de ecuaciones utilizando la Regla de Cramer.",
          },
          {
            name: "Valores y vectores característicos.",
            description:
              "Introducción a los valores y vectores característicos y su importancia en el álgebra lineal.",
          },
        ],
      },
      {
        name: "Espacios Vectoriales",
        topics: [
          {
            name: "Vectores en R2. Producto escalar y proyecciones en R2.",
            description:
              "Estudio de vectores en el plano, producto escalar y proyecciones vectoriales.",
          },
          {
            name: "Vectores en R3. Producto cruz. Rectas y planos en R3.",
            description:
              "Análisis de vectores en el espacio tridimensional, producto cruz, y representación de rectas y planos.",
          },
          {
            name: "Espacios vectoriales. Subespacios. Combinaciones lineales y espacio generado.",
            description:
              "Concepto de espacios vectoriales y subespacios, combinaciones lineales y espacios generados.",
          },
          {
            name: "Independencia lineal. Base y dimensión.",
            description:
              "Definición de independencia lineal, bases y dimensión de espacios vectoriales.",
          },
          {
            name: "Cambio de base.",
            description:
              "Métodos para cambiar la base de un espacio vectorial y sus aplicaciones.",
          },
          {
            name: "Espacio Fila y espacio columna.",
            description:
              "Análisis de espacio fila y espacio columna en el contexto de matrices y sus aplicaciones.",
          },
        ],
      },
      {
        name: "Transformaciones lineales",
        topics: [
          {
            name: "Definición y propiedades de las transformaciones lineales. Imagen y núcleo de una trasformación.",
            description:
              "Estudio de las transformaciones lineales, sus propiedades, y conceptos de imagen y núcleo.",
          },
          {
            name: "Representación matricial de una transformación lineal.",
            description:
              "Métodos para representar transformaciones lineales mediante matrices.",
          },
          {
            name: "Geometría de las transformaciones lineales de R2 en R2.",
            description:
              "Análisis geométrico de las transformaciones lineales en el plano.",
          },
        ],
      },
    ],
  },
];
