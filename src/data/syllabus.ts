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
  {
    id: 5,
    classname: "Química I",
    description: "Química I es un curso que se imparte dentro del primer semestre de la Unidad Curricular Básica de la Universidad Yachay Tech. El objetivo del curso es que el estudiante adquiera conocimientos fundamentales de química que le permitan comprender diversos fenómenos del mundo que nos rodea. La asignatura abarca temas como la termodinámica, teoría cuántica, estructura atómica y enlaces químicos.",
    units: [
      {
        name: "Termodinámica I",
        topics: [
          {
            name: "La naturaleza de la energía",
            description: "Definiciones clave de energía, tipos de energía, conservación y transferencia de energía, unidades de energía."
          },
          {
            name: "La primera ley de la termodinámica",
            description: "Estudio de la energía interna, calor y trabajo."
          },
          {
            name: "Cuantificación del calor y el trabajo",
            description: "Cambios de temperatura y capacidad calorífica, transferencia de energía térmica, trabajo: trabajo presión-volumen."
          },
          {
            name: "Medición de ΔU para reacciones químicas",
            description: "Calorimetría a volumen constante."
          },
          {
            name: "Entalpía: el calor liberado en una reacción química a presión constante",
            description: "Procesos exotérmicos y endotérmicos: un análisis molecular, estequiometría que involucra ΔH: ecuaciones termoquímicas."
          },
          {
            name: "Calorimetría de presión constante",
            description: "Medición de ΔHrxn."
          },
          {
            name: "Relaciones que involucran ΔHrxn",
            description: "Cálculo del cambio de entalpía estándar para una reacción."
          },
          {
            name: "Determinación de entalpías de reacción a partir de entalpías de formación estándar",
            description: "Estados estándar y cambios de entalpía estándar, calcular el cambio de entalpía estándar para una reacción."
          }
        ]
      },
      {
        name: "Teoría Cuántica",
        topics: [
          {
            name: "Naturaleza de la luz",
            description: "Propiedades de las ondas, espectro electromagnético, efecto fotoeléctrico."
          },
          {
            name: "Modelo de Bohr",
            description: "Postulados, espectros de emisión y absorción, el átomo de hidrógeno."
          },
          {
            name: "La naturaleza ondulatoria de la materia",
            description: "La longitud de onda de Broglie, principio de la incertidumbre de Heisenberg."
          },
          {
            name: "La mecánica cuántica y el átomo",
            description: "Números cuánticos."
          },
          {
            name: "Orbitales atómicos",
            description: "Forma de los orbitales atómicos."
          }
        ]
      },
      {
        name: "Propiedades Periódicas",
        topics: [
          {
            name: "Introducción a la tabla periódica",
            description: "Escritura de diagramas de orbitales y configuraciones electrónicas."
          },
          {
            name: "Principios de exclusión de Pauli, Aufbau y Hund",
            description: "Niveles y subniveles de energía, configuración electrónica para átomos multielectrónicos."
          },
          {
            name: "Configuraciones electrónicas y la tabla periódica",
            description: "Bloques de la tabla periódica, configuración e identificación de elementos dentro de la tabla periódica, elementos de transición y elementos de transición interna."
          },
          {
            name: "Tendencias periódicas de los elementos",
            description: "Carga nuclear efectiva, radio atómico, radio iónico, energía de ionización y afinidad electrónica, carácter metálico."
          }
        ]
      },
      {
        name: "Enlace Iónico",
        topics: [
          {
            name: "Tipos de enlaces químicos",
            description: "Definición y propiedades de los enlaces iónicos."
          },
          {
            name: "Símbolos de Lewis",
            description: "Representación de electrones de valencia y estructura de Lewis."
          },
          {
            name: "Enlace iónico",
            description: "Definición y propiedades, estructuras de Lewis."
          },
          {
            name: "Energía Reticular",
            description: "Ciclo de Born-Haber, ley de Coulomb."
          }
        ]
      },
      {
        name: "Enlace Covalente",
        topics: [
          {
            name: "Enlace covalente",
            description: "Introducción al enlace covalente."
          },
          {
            name: "Estructura de Lewis",
            description: "Enlaces covalentes simples, dobles y triples."
          },
          {
            name: "Electronegatividad y polaridad del enlace",
            description: "Momento dipolar, porcentaje de carácter iónico."
          },
          {
            name: "Estructuras de Lewis",
            description: "Compuestos moleculares, iones poliatómicos."
          },
          {
            name: "Resonancia",
            description: "Estructuras resonantes de Lewis."
          },
          {
            name: "Carga formal",
            description: "Cálculo de la carga formal en estructuras de Lewis."
          },
          {
            name: "Excepciones de la regla del octeto",
            description: "Especies de electrones impares, octetos incompletos y expandidos."
          },
          {
            name: "Energías y longitudes de enlace",
            description: "Relación entre energía y longitud de enlace."
          },
          {
            name: "Reglas de Fajans",
            description: "Aplicación de las reglas de Fajans en enlaces covalentes."
          }
        ]
      },
      {
        name: "Geometría Molecular",
        topics: [
          {
            name: "Modelo de la repulsión de los pares electrónicos de la capa de valencia (RPECV)",
            description: "Formas básicas y efecto de los pares libres."
          },
          {
            name: "Predicción de geometrías moleculares",
            description: "Uso del modelo RPECV para predecir geometrías moleculares."
          },
          {
            name: "Geometría molecular y polaridad",
            description: "Relación entre geometría molecular y polaridad de la molécula."
          }
        ]
      },
      {
        name: "Fuerzas Intermoleculares",
        topics: [
          {
            name: "Sólidos, líquidos y gases: una comparación molecular",
            description: "Diferencias entre estados de la materia y cambios entre estados."
          },
          {
            name: "Fuerzas intermoleculares en estados condensados",
            description: "Fuerza de dispersión (dipolo instantáneo-dipolo inducido), fuerza dipolo-dipolo (enlace de hidrógeno)."
          },
          {
            name: "Fuerzas intermoleculares en mezclas",
            description: "Fuerza ion-dipolo, fuerzas dipolo-dipolo inducido, fuerzas ion-dipolo inducido."
          },
          {
            name: "Puntos de fusión y ebullición",
            description: "Relación entre puntos de fusión/ebullición y fuerzas intermoleculares."
          }
        ]
      },
      {
        name: "Teoría del Enlace de Valencia",
        topics: [
          {
            name: "Conceptos básicos",
            description: "Fundamentos de la teoría del enlace de valencia."
          },
          {
            name: "Hibridación de orbitales atómicos",
            description: "Hibridación sp3, sp2, sp, sp3d y sp3d2."
          },
          {
            name: "Escritura de esquemas de hibridación y de enlace",
            description: "Representación de esquemas de hibridación y enlace."
          }
        ]
      },
      {
        name: "Teoría de Orbital Molecular",
        topics: [
          {
            name: "Combinación Lineal de Orbitales Atómicos (CLOA, LCAOs)",
            description: "Principios de la combinación lineal de orbitales atómicos."
          },
          {
            name: "Moléculas diatómicas homo y heteronucleares del segundo periodo",
            description: "Diagramas de energía, orden de enlace, configuraciones electrónicas, propiedades moleculares, orbitales frontera."
          }
        ]
      }
    ]
  },
  {
    id: 9,
    classname: "Biología I",
    description: "La asignatura de Biología I tiene como objetivo acercar al alumno a la unidad fundamental de un ser vivo: la célula. El curso abarca desde la importancia del agua y las biomoléculas, hasta la estructura y función de la célula, la comunicación celular, y los procesos de transformación de energía como la respiración y fotosíntesis.",
    units: [
      {
        name: "Química de la Vida",
        topics: [
          {
            name: "Materia y Energía",
            description: "Biomoléculas y principios inmediatos, relevancia de las fuerzas intermoleculares, agua, sales minerales, gases, el átomo de carbono y compuestos orgánicos."
          },
          {
            name: "Glúcidos",
            description: "Estructura y función, enlace glucosídico, tipos de glúcidos: monosacáridos, disacáridos y polisacáridos."
          },
          {
            name: "Proteínas",
            description: "Estructura y función, tipos de aminoácidos, enlace peptídico, niveles de estructuración: primaria, secundaria, terciaria y cuaternaria."
          },
          {
            name: "Lípidos",
            description: "Estructura y función, ácidos grasos, triglicéridos, fosfolípidos, esteroides, LDL, HDL, vitaminas y ceras."
          },
          {
            name: "Ácidos Nucleicos",
            description: "Estructura y función, tipos de nucleótidos (ADN y ARN), enlace fosfodiéster."
          }
        ]
      },
      {
        name: "Estructura y Fisiología Celular",
        topics: [
          {
            name: "Célula Procariota",
            description: "Teoría celular, estructura y función de las células en los dominios Archaea y Bacteria, clasificación de bacterias: Gram-positivas y Gram-negativas, recombinación del cromosoma bacteriano."
          },
          {
            name: "Célula Eucariota",
            description: "Estructura: pared celular, membrana celular, núcleo, nucléolo, retículo endoplasmático liso y rugoso, aparato de Golgi, mitocondrias, plastos, vacuolas, ribosomas, peroxisomas, lisosomas, citoesqueleto, sistema de endomembranas, matriz extracelular. Diferencias estructurales entre las células de plantas, hongos y animales."
          },
          {
            name: "Virus y Priones",
            description: "Estructura y clasificación de virus, viroides y priones, ejemplos de enfermedades virales y priónicas."
          }
        ]
      },
      {
        name: "Membranas Biológicas",
        topics: [
          {
            name: "Estructura y Funciones",
            description: "Moléculas anfipáticas de la membrana, composición lipídica, topografía proteica de las membranas, modelo de mosaico fluido, glúcidos de membrana, funciones y adaptaciones de la membrana plasmática."
          },
          {
            name: "Transporte Molecular",
            description: "Permeabilidad de la membrana, difusión y ósmosis, transporte pasivo y activo, bomba Na+/K+, canales iónicos, gradiente electroquímico transmembrana y potencial de membrana."
          },
          {
            name: "Transporte Mediado por Vesículas",
            description: "Fagocitosis, endocitosis, endocitosis mediada por receptor, pinocitosis, interacción endocitosis-autofagia, transcitosis, exocitosis: secreción paracrina, endocrina y exocrina."
          },
          {
            name: "Comunicación Intercelular y Transducción Celular",
            description: "Asociación receptor-ligando, vías de señalización intracelular y segundos mensajeros, uniones intercelulares: ocluyentes, adherentes y comunicantes."
          }
        ]
      },
      {
        name: "Enzimas Metabólicas y Respiración",
        topics: [
          {
            name: "Enzimas Metabólicas",
            description: "Definición y mecanismos de acción, cinética enzimática, regulación: alosterismo y cooperatividad, modificación covalente, activación por proteólisis, inhibidores, isoenzimas."
          },
          {
            name: "Respiración",
            description: "Respiración aeróbica: glicólisis, ciclo de Krebs, cadena transportadora de electrones, fosforilación oxidativa. Respiración anaeróbica y fermentación."
          }
        ]
      },
      {
        name: "Fotosíntesis",
        topics: [
          {
            name: "Captación de la Energía Solar",
            description: "Aparato fotosintético, pigmentos fotosintéticos: tipos, función y espectro de absorción, fotosistemas I y II, transporte de electrones, fotofosforilación."
          },
          {
            name: "Fijación del Carbono",
            description: "Fijación de CO2 por el Ciclo de Calvin, fijación vía C3, fotorespiración, vías alternas de fijación: C4 y CAM, carboxilación: tipos, activación y regulación, plantas C3, C4 y CAM."
          }
        ]
      }
    ]
  }
];
