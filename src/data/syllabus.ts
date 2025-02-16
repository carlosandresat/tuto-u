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
    id: 2,
    classname: "Cálculo II",
    description:
      "La presente asignatura busca construir en los estudiantes conocimientos y herramientas complementarios del Cálculo Diferencial e Integral (en una variable real), indispensables para el desarrollo de conocimiento en asignaturas subsecuentes de carreras de Ingeniería y Ciencias de Yachay Tech.",
    units: [
      {
        name: "Complementos de Integración",
        topics: [
          {
            name: "Repaso de algunos contenidos de Cálculo I, Función abstracta, dominio de definición.",
          },
          {
            name: "Sucesiones reales. Criterios de convergencia.",
          },
          {
            name: "Series numéricas. Criterios de convergencia y divergencia.",
          },
          {
            name: "Representación vectorial o paramétrica de curvas.",
          },
          {
            name: "Movimiento de partículas.",
          },
          {
            name: "Coordenadas polares.",
          },
        ],
      },
      {
        name: "Integrales Impropias e Introducción a las Ecuaciones Diferenciales Ordinarias",
        topics: [
          {
            name: "Repaso de la definición de Integral de Riemann",
          },
          {
            name: "Teorema Fundamental del Cálculo.",
          },
          {
            name: "Longitud de arco. Volúmenes de revolución.",
          },
          {
            name: "Integrales impropias. Criterios de convergencia y divergencia.",
          },
          {
            name: "Ecuaciones diferenciales ordinarias de primer orden: separables y lineales.",
          },
          {
            name: "Introducción al modelamiento matemático.",
          },
        ],
      },
      {
        name: "Series de funciones",
        topics: [
          {
            name: "Criterios de convergencia",
          },
          {
            name: "Series y polinomios de Taylor. Teorema del resto. Aplicaciones.",
          },
          {
            name: "Introducción a Series de Fourier.",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    classname: "Química I",
    description:
      "Química I es un curso que se imparte dentro del primer semestre de la Unidad Curricular Básica de la Universidad Yachay Tech. El objetivo del curso es que el estudiante adquiera conocimientos fundamentales de química que le permitan comprender diversos fenómenos del mundo que nos rodea. La asignatura abarca temas como la termodinámica, teoría cuántica, estructura atómica y enlaces químicos.",
    units: [
      {
        name: "Termodinámica I",
        topics: [
          {
            name: "La naturaleza de la energía",
            description:
              "Definiciones clave de energía, tipos de energía, conservación y transferencia de energía, unidades de energía.",
          },
          {
            name: "La primera ley de la termodinámica",
            description: "Estudio de la energía interna, calor y trabajo.",
          },
          {
            name: "Cuantificación del calor y el trabajo",
            description:
              "Cambios de temperatura y capacidad calorífica, transferencia de energía térmica, trabajo: trabajo presión-volumen.",
          },
          {
            name: "Medición de ΔU para reacciones químicas",
            description: "Calorimetría a volumen constante.",
          },
          {
            name: "Entalpía: el calor liberado en una reacción química a presión constante",
            description:
              "Procesos exotérmicos y endotérmicos: un análisis molecular, estequiometría que involucra ΔH: ecuaciones termoquímicas.",
          },
          {
            name: "Calorimetría de presión constante",
            description: "Medición de ΔHrxn.",
          },
          {
            name: "Relaciones que involucran ΔHrxn",
            description:
              "Cálculo del cambio de entalpía estándar para una reacción.",
          },
          {
            name: "Determinación de entalpías de reacción a partir de entalpías de formación estándar",
            description:
              "Estados estándar y cambios de entalpía estándar, calcular el cambio de entalpía estándar para una reacción.",
          },
        ],
      },
      {
        name: "Teoría Cuántica",
        topics: [
          {
            name: "Naturaleza de la luz",
            description:
              "Propiedades de las ondas, espectro electromagnético, efecto fotoeléctrico.",
          },
          {
            name: "Modelo de Bohr",
            description:
              "Postulados, espectros de emisión y absorción, el átomo de hidrógeno.",
          },
          {
            name: "La naturaleza ondulatoria de la materia",
            description:
              "La longitud de onda de Broglie, principio de la incertidumbre de Heisenberg.",
          },
          {
            name: "La mecánica cuántica y el átomo",
            description: "Números cuánticos.",
          },
          {
            name: "Orbitales atómicos",
            description: "Forma de los orbitales atómicos.",
          },
        ],
      },
      {
        name: "Propiedades Periódicas",
        topics: [
          {
            name: "Introducción a la tabla periódica",
            description:
              "Escritura de diagramas de orbitales y configuraciones electrónicas.",
          },
          {
            name: "Principios de exclusión de Pauli, Aufbau y Hund",
            description:
              "Niveles y subniveles de energía, configuración electrónica para átomos multielectrónicos.",
          },
          {
            name: "Configuraciones electrónicas y la tabla periódica",
            description:
              "Bloques de la tabla periódica, configuración e identificación de elementos dentro de la tabla periódica, elementos de transición y elementos de transición interna.",
          },
          {
            name: "Tendencias periódicas de los elementos",
            description:
              "Carga nuclear efectiva, radio atómico, radio iónico, energía de ionización y afinidad electrónica, carácter metálico.",
          },
        ],
      },
      {
        name: "Enlace Iónico",
        topics: [
          {
            name: "Tipos de enlaces químicos",
            description: "Definición y propiedades de los enlaces iónicos.",
          },
          {
            name: "Símbolos de Lewis",
            description:
              "Representación de electrones de valencia y estructura de Lewis.",
          },
          {
            name: "Enlace iónico",
            description: "Definición y propiedades, estructuras de Lewis.",
          },
          {
            name: "Energía Reticular",
            description: "Ciclo de Born-Haber, ley de Coulomb.",
          },
        ],
      },
      {
        name: "Enlace Covalente",
        topics: [
          {
            name: "Enlace covalente",
            description: "Introducción al enlace covalente.",
          },
          {
            name: "Estructura de Lewis",
            description: "Enlaces covalentes simples, dobles y triples.",
          },
          {
            name: "Electronegatividad y polaridad del enlace",
            description: "Momento dipolar, porcentaje de carácter iónico.",
          },
          {
            name: "Estructuras de Lewis",
            description: "Compuestos moleculares, iones poliatómicos.",
          },
          {
            name: "Resonancia",
            description: "Estructuras resonantes de Lewis.",
          },
          {
            name: "Carga formal",
            description: "Cálculo de la carga formal en estructuras de Lewis.",
          },
          {
            name: "Excepciones de la regla del octeto",
            description:
              "Especies de electrones impares, octetos incompletos y expandidos.",
          },
          {
            name: "Energías y longitudes de enlace",
            description: "Relación entre energía y longitud de enlace.",
          },
          {
            name: "Reglas de Fajans",
            description:
              "Aplicación de las reglas de Fajans en enlaces covalentes.",
          },
        ],
      },
      {
        name: "Geometría Molecular",
        topics: [
          {
            name: "Modelo de la repulsión de los pares electrónicos de la capa de valencia (RPECV)",
            description: "Formas básicas y efecto de los pares libres.",
          },
          {
            name: "Predicción de geometrías moleculares",
            description:
              "Uso del modelo RPECV para predecir geometrías moleculares.",
          },
          {
            name: "Geometría molecular y polaridad",
            description:
              "Relación entre geometría molecular y polaridad de la molécula.",
          },
        ],
      },
      {
        name: "Fuerzas Intermoleculares",
        topics: [
          {
            name: "Sólidos, líquidos y gases: una comparación molecular",
            description:
              "Diferencias entre estados de la materia y cambios entre estados.",
          },
          {
            name: "Fuerzas intermoleculares en estados condensados",
            description:
              "Fuerza de dispersión (dipolo instantáneo-dipolo inducido), fuerza dipolo-dipolo (enlace de hidrógeno).",
          },
          {
            name: "Fuerzas intermoleculares en mezclas",
            description:
              "Fuerza ion-dipolo, fuerzas dipolo-dipolo inducido, fuerzas ion-dipolo inducido.",
          },
          {
            name: "Puntos de fusión y ebullición",
            description:
              "Relación entre puntos de fusión/ebullición y fuerzas intermoleculares.",
          },
        ],
      },
      {
        name: "Teoría del Enlace de Valencia",
        topics: [
          {
            name: "Conceptos básicos",
            description: "Fundamentos de la teoría del enlace de valencia.",
          },
          {
            name: "Hibridación de orbitales atómicos",
            description: "Hibridación sp3, sp2, sp, sp3d y sp3d2.",
          },
          {
            name: "Escritura de esquemas de hibridación y de enlace",
            description: "Representación de esquemas de hibridación y enlace.",
          },
        ],
      },
      {
        name: "Teoría de Orbital Molecular",
        topics: [
          {
            name: "Combinación Lineal de Orbitales Atómicos (CLOA, LCAOs)",
            description:
              "Principios de la combinación lineal de orbitales atómicos.",
          },
          {
            name: "Moléculas diatómicas homo y heteronucleares del segundo periodo",
            description:
              "Diagramas de energía, orden de enlace, configuraciones electrónicas, propiedades moleculares, orbitales frontera.",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    classname: "Física I",
    description:
      "La Física es la ciencia cuyo objetivo es comprender las leyes que rigen el universo. Estudia la energía, la materia y las relaciones entre ellas. Es tal vez una de las ciencias más fundamentales, en todas las demás ciencias (salvo la matemáticas) se necesita comprender los principios básicos de la física. Desde, la as más pequeñas sub-partículas hasta el comportamiento del universo en su totalidad, desde cómo se creó el universo hasta cómo terminará, con tan amplio espectro de aplicación, no es de extrañar que la física sea junto con las matemáticas una disciplina fundamental para todas las demás ciencias.",
    units: [
      {
        name: "Introducción",
        topics: [
          {
            name: "Introducción a la Física",
            description:
              "Introducción a la física y su importancia en la comprensión del universo.",
          },
          {
            name: "Vectores",
            description:
              "Conceptos básicos de vectores y sus aplicaciones en física.",
          },
        ],
      },
      {
        name: "Cinemática en una, dos y tres dimensiones",
        topics: [
          {
            name: "Generalidades",
            description: "Conceptos de partícula, espacio y tiempo.",
          },
          {
            name: "Sistemas de Referencia",
            description: "Conceptos de movimiento y reposo.",
          },
          {
            name: "Posición y Desplazamiento",
            description:
              "Vector posición, ecuación de trayectoria, espacio recorrido, distancia recorrida.",
          },
          {
            name: "Rapidez y Velocidad",
            description:
              "Rapidez media e instantánea, vector velocidad, velocidad media, velocidad instantánea.",
          },
          {
            name: "Aceleración",
            description:
              "Vector aceleración, aceleración media, aceleración instantánea, aceleración total.",
          },
          {
            name: "Movimiento con aceleración constante",
            description: "Caída libre, condiciones de este movimiento.",
          },
          {
            name: "Trayectoria y gráficas de cinemática",
            description:
              "Gráficos posición vs. tiempo, velocidad vs. tiempo, aceleración vs. tiempo, trayectoria de un movimiento (paramétrica y analítica).",
          },
          {
            name: "Cinemática en dos dimensiones",
            description: "Conceptos básicos de cinemática en dos dimensiones.",
          },
          {
            name: "Movimiento circular uniforme",
            description: "Cinemática del movimiento circular uniforme.",
          },
          {
            name: "Movimiento relativo",
            description: "Conceptos de movimiento relativo.",
          },
        ],
      },
      {
        name: "Dinámica y leyes de movimiento",
        topics: [
          {
            name: "Causas del movimiento y efectos del movimiento",
            description:
              "Fuerzas de la naturaleza, gravitación, electrostática, nuclear débil, nuclear fuerte. La inercia, la masa, la fuerza neta, las leyes de Newton para la mecánica.",
          },
          {
            name: "Tipos de fuerzas",
            description:
              "Peso (fuerza gravitacional), planos inclinados, tensiones, fuerzas de fricción: fricción estática y fricción cinética.",
          },
          {
            name: "Dinámica de Traslación",
            description:
              "Condiciones para que un cuerpo que esté sometido a fuerzas esté en movimiento. Leyes de la dinámica. Diagramas del cuerpo libre y técnica para resolver ejercicios de mecánica en general. Aplicaciones de las leyes de Newton.",
          },
          {
            name: "Dinámica del movimiento circular uniforme",
            description:
              "Conceptos básicos de dinámica del movimiento circular uniforme.",
          },
          {
            name: "Movimiento circular no uniforme",
            description:
              "Conceptos básicos de movimiento circular no uniforme.",
          },
        ],
      },
      {
        name: "Trabajo, Energía y Potencia",
        topics: [
          {
            name: "Trabajo de fuerza constantes",
            description:
              "Trabajo con fuerzas constantes paralelas y no paralelas al desplazamiento. Trabajo de varias fuerzas. Trabajo neto.",
          },
          {
            name: "Trabajo de fuerza variables",
            description: "Método gráfico, método analítico.",
          },
          {
            name: "Potencia",
            description: "Conceptos básicos de potencia.",
          },
          {
            name: "Energía Mecánica",
            description:
              "Energía cinética, energía potencial gravitacional, energía potencial elástica (resortes, Ley de Hooke).",
          },
          {
            name: "Teorema de la conservación de la energía mecánica",
            description:
              "Conceptos básicos del teorema de la conservación de la energía mecánica.",
          },
          {
            name: "Teorema General del trabajo y la energía",
            description:
              "Fuerzas disipativas y trabajo disipativo. Teorema de conservación de la Energía.",
          },
        ],
      },
      {
        name: "Impulso y cantidad de movimiento lineal",
        topics: [
          {
            name: "Impulso",
            description:
              "Cantidad de movimiento lineal, teorema del impulso y la cantidad de movimiento lineal, cantidad de movimiento lineal y la segunda ley de Newton.",
          },
          {
            name: "Colisiones",
            description: "Conceptos básicos de colisiones.",
          },
          {
            name: "Sistema de partículas",
            description: "Centro de masa.",
          },
        ],
      },
      {
        name: "Movimiento rotacional",
        topics: [
          {
            name: "Cantidades angulares",
            description: "Conceptos básicos de cantidades angulares.",
          },
          {
            name: "Torque",
            description: "Leyes de Newton para la rotación.",
          },
          {
            name: "Rotación de un objeto sólido",
            description: "Conceptos básicos de rotación de un objeto sólido.",
          },
          {
            name: "Momento de inercia",
            description: "Energía cinética rotacional, movimiento de rodadura.",
          },
          {
            name: "Momento angular",
            description: "Conservación de la cantidad de movimiento angular.",
          },
          {
            name: "Aplicaciones del movimiento rotacional",
            description:
              "Conceptos básicos de aplicaciones del movimiento rotacional.",
          },
        ],
      },
      {
        name: "Gravitación",
        topics: [
          {
            name: "Ley de Newton de la gravitación universal",
            description:
              "Forma vectorial de la ley de Newton de la gravitación universal, gravedad cerca de la superficie de la Tierra: Aplicaciones geofísicas, satélites e 'ingravidez'.",
          },
          {
            name: "Leyes de Kepler y síntesis de Newton",
            description: "Campo gravitacional.",
          },
        ],
      },
    ],
  },

  {
    id: 9,
    classname: "Biología I",
    description:
      "La asignatura de Biología I tiene como objetivo acercar al alumno a la unidad fundamental de un ser vivo: la célula. El curso abarca desde la importancia del agua y las biomoléculas, hasta la estructura y función de la célula, la comunicación celular, y los procesos de transformación de energía como la respiración y fotosíntesis.",
    units: [
      {
        name: "Química de la Vida",
        topics: [
          {
            name: "Materia y Energía",
            description:
              "Biomoléculas y principios inmediatos, relevancia de las fuerzas intermoleculares, agua, sales minerales, gases, el átomo de carbono y compuestos orgánicos.",
          },
          {
            name: "Glúcidos",
            description:
              "Estructura y función, enlace glucosídico, tipos de glúcidos: monosacáridos, disacáridos y polisacáridos.",
          },
          {
            name: "Proteínas",
            description:
              "Estructura y función, tipos de aminoácidos, enlace peptídico, niveles de estructuración: primaria, secundaria, terciaria y cuaternaria.",
          },
          {
            name: "Lípidos",
            description:
              "Estructura y función, ácidos grasos, triglicéridos, fosfolípidos, esteroides, LDL, HDL, vitaminas y ceras.",
          },
          {
            name: "Ácidos Nucleicos",
            description:
              "Estructura y función, tipos de nucleótidos (ADN y ARN), enlace fosfodiéster.",
          },
        ],
      },
      {
        name: "Estructura y Fisiología Celular",
        topics: [
          {
            name: "Célula Procariota",
            description:
              "Teoría celular, estructura y función de las células en los dominios Archaea y Bacteria, clasificación de bacterias: Gram-positivas y Gram-negativas, recombinación del cromosoma bacteriano.",
          },
          {
            name: "Célula Eucariota",
            description:
              "Estructura: pared celular, membrana celular, núcleo, nucléolo, retículo endoplasmático liso y rugoso, aparato de Golgi, mitocondrias, plastos, vacuolas, ribosomas, peroxisomas, lisosomas, citoesqueleto, sistema de endomembranas, matriz extracelular. Diferencias estructurales entre las células de plantas, hongos y animales.",
          },
          {
            name: "Virus y Priones",
            description:
              "Estructura y clasificación de virus, viroides y priones, ejemplos de enfermedades virales y priónicas.",
          },
        ],
      },
      {
        name: "Membranas Biológicas",
        topics: [
          {
            name: "Estructura y Funciones",
            description:
              "Moléculas anfipáticas de la membrana, composición lipídica, topografía proteica de las membranas, modelo de mosaico fluido, glúcidos de membrana, funciones y adaptaciones de la membrana plasmática.",
          },
          {
            name: "Transporte Molecular",
            description:
              "Permeabilidad de la membrana, difusión y ósmosis, transporte pasivo y activo, bomba Na+/K+, canales iónicos, gradiente electroquímico transmembrana y potencial de membrana.",
          },
          {
            name: "Transporte Mediado por Vesículas",
            description:
              "Fagocitosis, endocitosis, endocitosis mediada por receptor, pinocitosis, interacción endocitosis-autofagia, transcitosis, exocitosis: secreción paracrina, endocrina y exocrina.",
          },
          {
            name: "Comunicación Intercelular y Transducción Celular",
            description:
              "Asociación receptor-ligando, vías de señalización intracelular y segundos mensajeros, uniones intercelulares: ocluyentes, adherentes y comunicantes.",
          },
        ],
      },
      {
        name: "Enzimas Metabólicas y Respiración",
        topics: [
          {
            name: "Enzimas Metabólicas",
            description:
              "Definición y mecanismos de acción, cinética enzimática, regulación: alosterismo y cooperatividad, modificación covalente, activación por proteólisis, inhibidores, isoenzimas.",
          },
          {
            name: "Respiración",
            description:
              "Respiración aeróbica: glicólisis, ciclo de Krebs, cadena transportadora de electrones, fosforilación oxidativa. Respiración anaeróbica y fermentación.",
          },
        ],
      },
      {
        name: "Fotosíntesis",
        topics: [
          {
            name: "Captación de la Energía Solar",
            description:
              "Aparato fotosintético, pigmentos fotosintéticos: tipos, función y espectro de absorción, fotosistemas I y II, transporte de electrones, fotofosforilación.",
          },
          {
            name: "Fijación del Carbono",
            description:
              "Fijación de CO2 por el Ciclo de Calvin, fijación vía C3, fotorespiración, vías alternas de fijación: C4 y CAM, carboxilación: tipos, activación y regulación, plantas C3, C4 y CAM.",
          },
        ],
      },
    ],
  },
  {
    id: 10,
    classname: "Biología II",
    description:
      "La asignatura de Biología II entrelaza de manera lógica y secuencial los procesos genéticos, evolutivos y ecológicos, tomando como base los procesos a nivel celular que se estudiaron en Biología I. El curso describe los mecanismos genéticos de la vida que son la base sobre la cual, a través de millones de años, las fuerzas evolutivas han actuado dando como resultado las dinámicas interacciones ecológicas que actualmente observamos. Así el curso comprende cuatro grandes secciones: (1) genes, cromosomas y herencia; (2) expresión génica; (3) variación genética y evolución; y (4) principios de ecología.",
    units: [
      {
        name: "Genes, cromosomas y herencia",
        topics: [
          {
            name: "Introducción a la genética",
            description:
              "Conceptos básicos, historia, principales descubrimientos y avances, objeto de estudio de la genética y la genómica, estructura del ADN y ARN, cromatina, cromosoma, gen, dogma central de la biología molecular.",
          },
          {
            name: "Reproducción celular en procariotas",
            description:
              "Cromosoma bacteriano, mecanismos de replicación del ADN en bacterias, fisión binaria (reproducción asexual) en células procariotas, mecanismos de transferencia de material genético: transformación, conjugación y transducción.",
          },
          {
            name: "Reproducción celular en eucariotas",
            description:
              "Organización del ADN en cromosomas, cariotipo y variación cromosómica, autosomas y cromosomas sexuales, replicación del ADN en eucariotas, ciclo celular, sistema de control molecular del ciclo celular, mitosis, meiosis (reproducción sexual), enfermedades causadas por no disyunción de los cromosomas homólogos y cromátidas hermanas, ADN en organelos, mapeo de genes mediante cruces específicos.",
          },
          {
            name: "Herencia mendeliana",
            description:
              "Conceptos de genotipo y fenotipo, Leyes de Mendel (ley de la segregación y ley de la distribución independiente), conceptos de dominancia completa y recesividad completa.",
          },
          {
            name: "Herencia no mendeliana",
            description:
              "Dominancia incompleta, codominancia, alelos múltiples, herencia ligada al sexo, patrones de herencia letales (letal recesivo y letal dominante), herencia poligénica, pleiotropía, epistasis, imprinting.",
          },
        ],
      },
      {
        name: "Expresión génica",
        topics: [
          {
            name: "Transcripción",
            description:
              "Fases de la transcripción (iniciación, elongación y terminación), tipos de ARN, tipos de ARN polimerasas, síntesis del ARN mensajero (ARNm) y modificaciones posttranscripcionales en procariotas y eucariotas.",
          },
          {
            name: "Traducción",
            description:
              "Código genético, estructura del ribosoma y ARN de transferencia, fases de la traducción (iniciación, elongación y terminación), mecanismos de traducción en procariotas y eucariotas.",
          },
          {
            name: "Expresión génica",
            description:
              "Regulación de la expresión génica en procariotas y eucariotas, factores de transcripción, potenciadores, represores, modelo del operón, operón lactosa, operón triptófano, estructura de la cromatina (heterocromatina y eucromatina) y epigenética, degradación del ARNm, tipos y funciones de ARN no codificante.",
          },
        ],
      },
      {
        name: "Variación genética y evolución",
        topics: [
          {
            name: "Mecanismos de variación genética",
            description:
              "Mutación (mecanismos de inducción y tipos), reordenaciones y mutaciones cromosómicas, transposones.",
          },
          {
            name: "Microevolución y genética de poblaciones",
            description:
              "Concepto de población. Ley de Hardy-Weinberg, cambios microevolutivos de las poblaciones (mutación, migración, deriva génica y selección natural).",
          },
          {
            name: "Macroevolución",
            description:
              "Evidencias de la evolución, mecanismos de especiación, definiciones de especie, análisis filogenético.",
          },
        ],
      },
      {
        name: "Ecología",
        topics: [
          {
            name: "Introducción a la ecología",
            description:
              "Historia, aplicaciones, definición de organismos, poblaciones, comunidades y ecosistemas, factores abióticos y bióticos que regulan la distribución y diversidad de especies (poblaciones) y comunidades, biomas acuáticos, adaptaciones a factores abióticos.",
          },
          {
            name: "Ecología de poblaciones",
            description:
              "Demografía y modelos de crecimiento poblacional (exponencial, logístico, con competencia, y depredación, transmisión de enfermedades), nichos ecológicos y tipos de interacciones, estrategias de vida, factores que regulan las poblaciones.",
          },
          {
            name: "Ecología de comunidades",
            description:
              "Interacciones entre poblaciones, dinámica predador-presa, estructura de comunidades (abundancia y medidas de diversidad). Gradientes de biodiversidad, sucesión ecológica, disturbio y riqueza de especies, principios de biogeografía.",
          },
          {
            name: "Ecología de ecosistemas",
            description:
              "Flujos de materia y energía en ecosistemas, dinámica trófica, productividad, ciclos biogeoquímicos, servicios ecosistémicos.",
          },
        ],
      },
    ],
  },
  {
    id: 11,
    classname: "Ciencias de la Tierra",
    description:
      "Esta asignatura dará a conocer los principios que influyen y manejan los procesos geológicos, los mismos que constituyen fuente de recursos naturales valiosos para la humanidad y en algunos casos un riesgo potencial. Los estudiantes aprenderán a reconocer, describir y analizar estos procesos geológicos con el fin de que estos conocimientos sean utilizados como herramientas de bienestar y desarrollo. Conjuntamente con esto se analizará su contaminación y el daño que reciben por la sobreexplotación. Finalmente, se estudiarán los principales recursos y riesgos naturales presentes en el Ecuador, para que los estudiantes relacionen lo aprendido en clase con su entorno.",
    units: [
      {
        name: "Introducción a las Ciencias de la Tierra",
        topics: [
          {
            name: "Introducción a la asignatura",
            description:
              "Presentación, revisión de los objetivos, organización y revisión del sílabo.",
          },
          {
            name: "Sistema Tierra",
            description:
              "Origen del Universo, el sistema solar, origen de la Tierra, estructura de la Tierra (modelo dinámico y estático), el tiempo en geología.",
          },
        ],
      },
      {
        name: "Procesos Físicos, Químicos y Cíclicos",
        topics: [
          {
            name: "La Geosfera",
            description: "Conceptos básicos y fenómenos relacionados.",
          },
          {
            name: "La Biosfera",
            description:
              "Conceptos básicos y evolución de los organismos a través del tiempo geológico.",
          },
          {
            name: "Análisis de riesgos",
            description:
              "Introducción de análisis de riesgos, peligro, amenaza, vulnerabilidad. Prevención y mitigación. Probabilidad de ocurrencia. Mapas de susceptibilidad, mapas de riesgos, mapas de amenazas.",
          },
        ],
      },
      {
        name: "La Litosfera",
        topics: [
          {
            name: "Conceptos básicos y Fenómenos relacionados",
            description:
              "La Tectónica de Placas (Teoría de la tectónica de placas. Tipos de límites. Evidencias de la tectónica de placas).",
          },
          {
            name: "Deformación de la corteza",
            description: "Deformación de la corteza.",
          },
        ],
      },
      {
        name: "Minerales y Rocas",
        topics: [
          {
            name: "Minerales",
            description:
              "Tipos de minerales (grupos, principales propiedades de reconocimiento).",
          },
          {
            name: "Minerales como recurso económico",
            description: "Minerales como recurso económico.",
          },
          {
            name: "Ciclo de las Rocas",
            description:
              "Tipos de rocas. Rocas y relación con la tectónica de placas.",
          },
        ],
      },
      {
        name: "Fenómenos Sísmicos y Volcánicos",
        topics: [
          {
            name: "Fenómenos sísmicos",
            description:
              "Sismicidad en la superficie de la Tierra, medida de los sismos, comportamiento de las rocas frente a esfuerzos.",
          },
          {
            name: "Sismología",
            description:
              "Relación entre placas tectónicas y sismos, medidas de los sismos, ondas sísmicas, sismogramas, tsunamis.",
          },
          {
            name: "Fenómenos Volcánicos",
            description:
              "Volcanes, importancia de los volcanes, partes de un volcán, tipos de volcán. Erupciones volcánicas en el Ecuador, tipos de erupciones, tipos de lavas, medición de una erupción, fenómenos que se derivan de una erupción.",
          },
        ],
      },
      {
        name: "Suelo y Fenómenos de Remoción de Masa",
        topics: [
          {
            name: "Suelo como recurso",
            description:
              "Importancia, componentes, génesis y contaminación del suelo, capacidad de intercambio catiónico con el medio.",
          },
          {
            name: "Fenómenos de Remoción de Masa (FRM)",
            description:
              "Clasificación de los FRM y sus características. Desastres naturales asociados a fenómenos sísmicos y volcánicos en el Ecuador.",
          },
        ],
      },
      {
        name: "La Hidrosfera",
        topics: [
          {
            name: "Aguas Superficiales",
            description:
              "Cuenca hidrográfica, ciclo del agua, canal fluvial, caudal, llanuras de inundación.",
          },
          {
            name: "Riesgos y Recursos",
            description: "Inundaciones y los factores.",
          },
          {
            name: "Aguas Subterráneas",
            description:
              "Importancia, acuíferos, áreas de carga y descarga, química de aguas subterráneas. Problemas medioambientales: Sobreexplotación de acuíferos, subsidencia, salinización de acuíferos. Contaminación de aguas subterráneas, prevención y control. Desastres naturales asociados a inundaciones y contaminación de acuíferos en el Ecuador.",
          },
        ],
      },
      {
        name: "La Atmósfera",
        topics: [
          {
            name: "Conceptos básicos y Fenómenos relacionados",
            description:
              "Composición de la atmósfera, capas de la atmósfera, calentamiento de la tropósfera, el agua en la atmósfera, presión atmosférica, fenómenos atmosféricos y procesos meteorológicos.",
          },
          {
            name: "Cambio Climático",
            description:
              "Bases conceptuales, bases físicas del planeta, expresiones del cambio climático, modelo de desarrollo y responsabilidad.",
          },
        ],
      },
      {
        name: "Recursos Naturales",
        topics: [
          {
            name: "Recursos Naturales Renovables y no renovables",
            description:
              "Recursos renovables: Conceptos, clasificación (viento, agua, luz solar y biota). Energía producida (Energía geotérmica, energía eólica, energía solar, energía hidroeléctrica).",
          },
          {
            name: "Recursos no renovables",
            description:
              "Conceptos, origen e importancia: Combustibles fósiles (Petróleo, carbón y gas). Minerales aprovechables (Minerales importantes de uso cotidiano, tecnológico y nuclear).",
          },
        ],
      },
      {
        name: "Diversidad y Riqueza Geológica del Ecuador",
        topics: [
          {
            name: "Descripción de estructuras tectónicas",
            description: "Cordilleras y Cuencas.",
          },
          {
            name: "La minería en el Ecuador",
          },
        ],
      },
    ],
  },
  {
    id: 15,
    classname: "Métodos Numéricos",
    description:
      "Los métodos numéricos se aplican cuando se buscan valores numéricos como solución a un problema matemático, y los procedimientos 'exactos' o 'analíticos' no pueden aplicarse, o el trabajo requerido para hallar una solución es prohibitivo. En este sentido, el estudio de los métodos numéricos propone desarrollar, analizar y aplicar métodos de cómputo, para resolver problemas modelados en diversas ramas de la matemática, con el uso del computador. Específicamente, en esta asignatura, se presenta una introducción a los métodos numéricos utilizados para resolver los principales y más utilizados métodos numéricos; por ejemplo, aquellos que nos sirven para resolver sistemas de ecuaciones lineales; calcular valores y vectores propios de matrices, aproximar funciones, sus derivadas e integrales; resolver ecuaciones no lineales y problemas de optimización. El uso de estos métodos es indispensable para el desarrollo de aplicaciones en ciencias básicas, economía e ingeniería.",
    units: [
      {
        name: "Motivación y Conceptos Básicos",
        topics: [
          {
            name: "Motivación: f(x)=0",
          },
          {
            name: "Decimales exactos y Cifras significativas",
          },
          {
            name: "Representación en punto flotante",
          },
          {
            name: "Aritmética del computador",
          },
          {
            name: "Errores de Representación",
          },
        ],
      },
      {
        name: "Sistemas Lineales",
        topics: [
          {
            name: "Métodos Directos",
          },
          {
            name: "Factorización LU",
          },
          {
            name: "Factorización de Cholesky",
          },
        ],
      },
      {
        name: "Métodos Iterativos",
        topics: [
          {
            name: "Método de Jacobi",
          },
          {
            name: "Método de Gauss-Seidel",
          },
          {
            name: "Ceros de Funciones",
          },
          {
            name: "Método de Bisección",
          },
          {
            name: "Método de la Secante",
          },
          {
            name: "Método de Newton",
          },
        ],
      },
      {
        name: "Métodos de Interpolación",
        topics: [
          {
            name: "Interpolación de Lagrange",
          },
          {
            name: "Interpolación de Newton",
          },
          {
            name: "Ajuste de Datos",
          },
        ],
      },
      {
        name: "Autovalores y Autovectores",
        topics: [
          {
            name: "El Método de las Potencias",
          },
          {
            name: "Derivados de las Potencias",
          },
          {
            name: "Cociente de Rayleigh",
          },
          {
            name: "Algoritmo QR",
          },
        ],
      },
      {
        name: "Integración Numérica",
        topics: [
          {
            name: "Reglas: Trapecio, Simpson",
          },
          {
            name: "Fórmulas de Newton Cotes",
          },
        ],
      },
      {
        name: "Diferenciación Numérica",
        topics: [
          {
            name: "Técnicas de Diferenciación Numérica",
          },
        ],
      },
    ],
  },
  {
    id: 14,
    classname: "Ecuaciones Diferenciales",
    description:
      "Este curso se encuentra en una de las áreas de las Matemáticas que tienen relación directa con problemas prácticos que aparecen en las distintas ingenierías, así como otras ramas del saber. Se introduce el modelaje de algunos problemas provenientes de leyes físicas que los rigen o que son de naturaleza geométrica, los cuales conducen a ecuaciones diferenciales ordinarias principalmente de orden uno o dos. Se estudiarán distintas técnicas para abordar el problema de encontrar soluciones de una ecuación diferencial ordinaria y también se hará énfasis que no siempre es posible encontrar, en términos de funciones elementales, soluciones para éstas. Esto último da motivación para realizar una breve discusión sobre un estudio cualitativo de ecuaciones autónomas en 1D y 2D, resaltando el estudio de estabilidad de puntos de equilibrio y comportamiento de soluciones a largo plazo.",
    units: [
      {
        name: "Introducción a las Ecuaciones Diferenciales",
        topics: [
          {
            name: "Presentación del curso",
          },
          {
            name: "Definiciones y terminología",
          },
          {
            name: "Problemas de valores iniciales",
          },
          {
            name: "Ecuaciones diferenciales como modelos matemáticos",
          },
        ],
      },
      {
        name: "Ecuaciones Diferenciales de Primer Orden",
        topics: [
          {
            name: "Variables Separables",
          },
          {
            name: "Ecuaciones Lineales",
          },
          {
            name: "Ecuaciones Exactas",
          },
          {
            name: "Ecuaciones diferenciales de primer orden autónomas",
            description:
              "Puntos de equilibrio. Esquema de fase. Comportamiento de soluciones a largo plazo.",
          },
        ],
      },
      {
        name: "Modelado con Ecuaciones Diferenciales de Primer Orden",
        topics: [
          {
            name: "Ecuaciones lineales",
          },
          {
            name: "Ecuaciones No lineales",
          },
        ],
      },
      {
        name: "Ecuaciones Diferenciales de Orden Superior",
        topics: [
          {
            name: "Teoría Preliminar: Ecuaciones Lineales",
          },
          {
            name: "Reducción de orden",
          },
          {
            name: "Ecuaciones Lineales homogéneas con coeficientes constantes",
          },
          {
            name: "Ecuaciones lineales no homogéneas",
            description:
              "Coeficientes indeterminados. Variación de parámetros.",
          },
          {
            name: "Ecuaciones no lineales",
          },
        ],
      },
      {
        name: "Modelado con Ecuaciones Diferenciales de Orden Superior",
        topics: [
          {
            name: "Ecuaciones Lineales",
          },
          {
            name: "Ecuaciones No Lineales",
          },
        ],
      },
      {
        name: "La Transformada de Laplace",
        topics: [
          {
            name: "Definición",
          },
          {
            name: "Transformada Inversa de Laplace",
          },
          {
            name: "Teoremas de Traslación",
          },
          {
            name: "Otras Propiedades operacionales",
          },
          {
            name: "Función delta de Dirac",
          },
        ],
      },
      {
        name: "Sistemas de Ecuaciones Diferenciales Lineales de Primer Orden",
        topics: [
          {
            name: "Sistemas lineales homogéneos con coeficientes constantes",
          },
          {
            name: "Sistemas lineales no homogéneos",
            description: "Variación de parámetros. Matriz Exponencial.",
          },
        ],
      },
      {
        name: "Ecuaciones Diferenciales Parciales",
        topics: [
          {
            name: "Solución de ecuaciones diferenciales parciales usando el método de separación de variables y series de Fourier",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    classname: "Probabilidad y Estadística",
    description:
      "En este curso se dictan los contenidos básicos de la Estadística y Probabilidades necesarios para el desarrollo de investigaciones en cualquier área de ciencias puras y aplicadas. En el área de la Estadística el curso se enfoca en manejo y tabulación de datos, cálculo de medidas estadística de posición, dispersión y simetría, graficación. En el área de las Probabilidad abarca los fundamentos matemáticos del cálculo de probabilidad, probabilidad frecuentista, conteo, probabilidad condicional, teorema de Bayes, teoremas de probabilidad total, distribuciones multivariadas. Seguidamente se dictan los temas relacionados con variables aleatorias, funciones de distribución, distribuciones discretas y continuas, teorema del límite central, distribuciones de muestreo, inferencia estadística, estimación de parámetros, intervalos de confianza, y se culmina con Pruebas de Hipóstesis. Todo el contenido se dicta usando el programa R.",
    units: [
      {
        name: "Estadística Descriptiva",
        topics: [
          {
            name: "Definición de estadística",
          },
          {
            name: "Tipos de variables",
          },
          {
            name: "Tablas y gráficos",
            description:
              "Histogramas, gráficos de tallo y hoja, gráficos de cajas.",
          },
          {
            name: "Medidas de posición",
            description: "Media, mediana, percentiles.",
          },
          {
            name: "Medidas de dispersión",
            description: "Varianza, desviación estándar.",
          },
          {
            name: "Medidas de Simetría",
          },
        ],
      },
      {
        name: "Fundamentos de Probabilidad",
        topics: [
          {
            name: "Conteo",
          },
          {
            name: "Espacio muestral",
          },
          {
            name: "Probabilidad frecuentista",
          },
          {
            name: "Probabilidad condicionada, independencia",
          },
          {
            name: "Teoremas de Bayes",
          },
        ],
      },
      {
        name: "Variables Aleatorias",
        topics: [
          {
            name: "Variables aleatorias discretas y continuas",
          },
          {
            name: "Función de distribución",
          },
          {
            name: "Esperanza y Varianza",
          },
          {
            name: "Covarianza",
          },
          {
            name: "Independencia",
          },
        ],
      },
      {
        name: "Distribuciones de Probabilidad Discretas y Continuas",
        topics: [
          {
            name: "Distribuciones discretas",
            description: "Uniforme, Bernoulli, Binomial, Poisson y geométrica.",
          },
          {
            name: "Distribuciones continuas",
            description: "Uniforme, Exponencial, Normal, Gamma, Beta.",
          },
        ],
      },
      {
        name: "Distribuciones de Probabilidad Multivariantes, Distribuciones Muestrales y el Teorema del Límite Central",
        topics: [
          {
            name: "Distribuciones de probabilidad bivariantes y multivariantes",
          },
          {
            name: "Distribuciones de probabilidad marginal y condicional",
          },
          {
            name: "Variables aleatorias independientes",
          },
          {
            name: "Distribuciones muestrales relacionadas con la distribución normal",
            description: "χ2, tStudent y F.",
          },
          {
            name: "Teorema del Límite Central",
          },
        ],
      },
      {
        name: "Estimación y Prueba de Hipótesis",
        topics: [
          {
            name: "Sesgo y error cuadrático medio de estimadores puntuales",
          },
          {
            name: "Algunos estimadores puntuales insesgados comunes",
          },
          {
            name: "Estimadores de máxima verosimilitud",
          },
          {
            name: "Intervalos de confianza",
          },
          {
            name: "Prueba de hipótesis y elementos de una prueba estadística",
          },
          {
            name: "Pruebas comunes con muestras grandes",
          },
          {
            name: "Cálculo de las probabilidades del error tipo II y determinación del tamaño muestral para la prueba Z",
          },
          {
            name: "Prueba de hipótesis con muestras pequeñas para μ y μ1−μ2",
          },
          {
            name: "Pruebas de hipótesis referentes a varianzas",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    classname: "Química II",
    description:
      "Química II es una asignatura que se imparte dentro del tercer semestre del Tronco Común en la Universidad de Investigación de Tecnología Experimental Yachay Tech. Con esta asignatura, junto con Química I se pretende, esencialmente, que el estudiante profundice en los conocimientos de química adquiridos en el colegio y durante la Nivelación General Emblemática y que, en determinados aspectos, los complemento. De esta manera, se establecerán los fundamentos imprescindibles para que el estudiante transite con éxito a estudios posteriores. En concreto, en esta asignatura se abordarán elementos básicos del equilibrio químico, el intercambio de energía en reacciones químicas, aspectos de cinética química y electroquímica incluyendo reacciones de oxidación/reducción. Aplicaciones de estos conceptos a situaciones químicas.",
    units: [
      {
        name: "Termodinámica",
        topics: [
          {
            name: "Primera Ley de la Termodinámica",
          },
          {
            name: "Medidas de Calor y trabajo",
          },
          {
            name: "Medidas de ΔE en reacciones químicas",
            description: "Calorimetría a Volumen Constante.",
          },
          {
            name: "Medidas de ΔH en reacciones químicas",
            description: "Reacciones a Presión Constante.",
          },
          {
            name: "Calorimetría a Presión Constante",
          },
          {
            name: "Relaciones de ΔH",
            description: "Ley de Hess.",
          },
          {
            name: "Entalpías Estándar de Formación",
            description:
              "Cálculo de Entalpías Estándar de Reacción a partir de Entalpías de Formación.",
          },
        ],
      },
      {
        name: "Disoluciones",
        topics: [
          {
            name: "Tipos de disoluciones y solubilidad",
          },
          {
            name: "Energía en la formación de disoluciones",
          },
          {
            name: "Equilibrio de disolución",
          },
          {
            name: "Factores que afectan a la solubilidad",
          },
          {
            name: "Expresión de la concentración",
            description: "Molaridad, molalidad, fracción molar.",
          },
          {
            name: "Propiedades coligativas de disoluciones",
            description:
              "Propiedades coligativas de disoluciones de electrolitos fuertes.",
          },
          {
            name: "Coloides",
          },
        ],
      },
      {
        name: "Cinética Química",
        topics: [
          {
            name: "Velocidad de reacciones Químicas",
          },
          {
            name: "Ley de Velocidad",
            description: "Efecto de la concentración.",
          },
          {
            name: "Ley integrada de Velocidad",
          },
          {
            name: "Efecto de la Temperatura sobre la Velocidad de Reacción",
          },
          {
            name: "Mecanismos de Reacción",
          },
          {
            name: "Catálisis",
          },
          {
            name: "Equilibrio Dinámico",
          },
          {
            name: "Constantes de Equilibrio (K)",
          },
          {
            name: "Expresiones de la Constante de Equilibrio en Términos de Presión Kp",
          },
          {
            name: "Equilibrio Heterogéneo",
            description: "Reacciones que Involucran Sólidos y Líquidos.",
          },
          {
            name: "Cálculos de la constante de equilibrio",
            description:
              "Factores que afectan el equilibrio químico. Cociente de Reacción.",
          },
          {
            name: "Principio de Le Châtelier",
          },
          {
            name: "La naturaleza de los ácidos y las bases",
            description: "Ácidos y bases de Brönsted-Lowry (par conjugado).",
          },
          {
            name: "Ácidos y bases de Arrhenius",
          },
          {
            name: "Fuerza de un Ácido",
            description: "Constante de Ionización Ácida K_e.",
          },
          {
            name: "Propiedades Ácido-Base del Agua",
            description: "Producto lónico del agua (K_w) pH.",
          },
          {
            name: "pH de Ácidos Débiles y Fuertes",
            description: "[H₃O⁺] y pH.",
          },
          {
            name: "Grado de disociación",
            description: "Soluciones de bases fuertes y débiles.",
          },
          {
            name: "Propiedades ácido-base de las sales",
          },
          {
            name: "Hidrólisis de las sales",
          },
          {
            name: "Ácidos poliprólicos",
          },
          {
            name: "Fuerza Acida y Estructura Molecular",
          },
          {
            name: "Ácidos y Bases Lewis",
          },
          {
            name: "Ecuación de Henderson y Hasselbalch",
            description: "Aplicaciones y limitaciones.",
          },
          {
            name: "Soluciones Buffer",
            description: "Rango y Capacidad.",
          },
          {
            name: "Titulaciones y Curvas de pH",
          },
          {
            name: "Equilibrio de Solubilidad y la Constante del Producto de Solubilidad (K_ss)",
          },
          {
            name: "Precipitación",
            description: "Efecto del Ion común.",
          },
        ],
      },
      {
        name: "Energía Libre de Gibbs y Termodinámica",
        topics: [
          {
            name: "Procesos Espontáneos y no Espontáneos",
          },
          {
            name: "Entropía y la Segunda Ley de la Termodinámica",
          },
          {
            name: "Cambios de Entropía y Cambios de Estados",
            description: "Cambios de Entropía en los Alrededores.",
          },
          {
            name: "Energía Libre de Gibbs",
          },
          {
            name: "Cambios de entropía en Reacciones Químicas",
            description: "Cambios de Energía Libre en Reacciones Químicas.",
          },
          {
            name: "Cambios de Energía Libre en Procesos No Estándar",
          },
          {
            name: "Cambios de Energía Libre y Constante de Equilibrio",
          },
        ],
      },
      {
        name: "Electroquímica",
        topics: [
          {
            name: "Balance de Reacciones Redox",
            description: "Método ion electrón.",
          },
          {
            name: "Celdas Voltaicas (Galvánicas)",
          },
          {
            name: "Potenciales de electrodo Estándar",
          },
          {
            name: "Potencial de Celda, Energía Libre y Constante de Equilibrio",
            description: "Potenciales de Celda y Concentración.",
          },
        ],
      },
    ],
  },
  {
    id: 17,
    classname: "Nivelación: Fundamentos de Matemáticas",
    description:
      "El presente es un curso propedéutico de Matemáticas que busca cubrir las falencias manifiestas por los estudiantes de bachillerato en el ámbito de álgebra y cálculo preparando el camino para el aprendizaje de los tópicos de Cálculo 1 y Álgebra Lineal del tronco común de YT. Los temas abordados en esta materia son indispensables en la formación de profesionales de carreras técnico-científicas. Al inicio se aborda una introducción al razonamiento lógico y teoría de conjuntos, herramientas fundamentales para estudiantes que estudiarán carreras en ciencias puras. Seguidamente se abordan los sistemas numéricos orientando al estudiante hacia la visión axiomática de los números reales, ecuaciones, inecuaciones. Posteriormente se plantean los fundamentos de funciones para progresivamente ir aumentando la complejidad hacia funciones polinomiales, racionales, exponenciales, logarítmicas y trigonométricas.",
    units: [
      {
        name: "Números reales y operaciones",
        topics: [
          {
            name: "Aritmética",
            description:
              "Desarrollo y simplificación de expresiones algebraicas, factorización.",
          },
          {
            name: "Conjuntos",
            description:
              "Definición y simbología de conjuntos, diagrama de Venn, cardinalidad de conjuntos. Cuantificadores. Ejemplos.",
          },
          {
            name: "Números Reales",
            description:
              "Representación del conjunto de los Números Reales. Intervalos en el conjunto de los números Reales. Axiomas de los números Reales. Orden. Cotas superiores e inferiores. Axioma del supremo. Conjuntos e Intervalos: abiertos, cerrados, semiabiertos.",
          },
          {
            name: "Proposiciones",
          },
          {
            name: "Demostraciones",
            description:
              "Demostraciones por reducción al absurdo, demostraciones de igualdades. Contraejemplos.",
          },
          {
            name: "Potencias",
            description: "Potencias: enteras y fraccionarias (Raíces).",
          },
          {
            name: "Polinomios",
            description:
              "Operaciones. Raíces. División de polinomios. Teorema del residuo y teorema del factor. División sintética. Ceros de un polinomio.",
          },
          {
            name: "Ecuaciones y su resolución",
            description:
              "Ecuaciones y su resolución (caso lineal y cuadrático). Aplicaciones. Despeje.",
          },
          {
            name: "Inecuaciones",
            description:
              "Resolución. Inecuaciones con valor absoluto. Resolución. Simetrías.",
          },
          {
            name: "Valor Absoluto",
            description: "Distancia entre dos números Reales.",
          },
          {
            name: "Lugar Geométrico",
            description: "Definición de lugar geométrico.",
          },
          {
            name: "Ecuaciones de la recta",
            description: "Rectas paralelas y perpendiculares.",
          },
          {
            name: "Ecuación del Círculo, Parábola, Hipérbola",
          },
          {
            name: "Fórmulas de geometría",
            description:
              "Área de rectángulo, triángulo, círculo, volumen de una caja rectangular, esfera, etc.",
          },
        ],
      },
      {
        name: "Funciones a Valores Reales",
        topics: [
          {
            name: "Relaciones y Funciones",
            description: "Ejemplos prácticos.",
          },
          {
            name: "Funciones de variable real",
            description:
              "Definición de dominio y rango (recorrido). Variable dependiente e independiente. Evaluación de funciones. Establecer tipos: Polinomiales, Racionales, potencia, Trascendentes.",
          },
          {
            name: "Determinar el dominio y rango",
          },
          {
            name: "Gráfica de funciones",
            description:
              "Pares ordenados, coordenadas en el plano cartesiano. Corte de la función con el eje X e Y. Funciones positivas y negativas.",
          },
          {
            name: "Técnicas de Graficación",
            description:
              "Corrimientos verticales y horizontales. Compresiones y Dilataciones. Reflexiones con respecto a los ejes de coordenadas.",
          },
          {
            name: "Funciones crecientes y decrecientes",
            description:
              "Pares e impares. Lineales. Identidad. Cuadrada. Cúbica. Recíproca. Parte entera.",
          },
          {
            name: "Funciones definidas por partes",
          },
          {
            name: "Funciones inyectivas, Sobreyectivas y Biyectiva",
          },
          {
            name: "Funciones Inversas",
          },
          {
            name: "Funciones Exponenciales y logarítmicas",
            description: "Gráficas. Propiedades. Ecuaciones.",
          },
          {
            name: "Composición de funciones y su dominio",
          },
          {
            name: "Operaciones con funciones y su dominio",
          },
        ],
      },
      {
        name: "Funciones Trigonométricas",
        topics: [
          {
            name: "Periodicidad de funciones",
          },
          {
            name: "Funciones trigonométricas",
            description:
              "Definición y propiedades de las funciones trigonométricas.",
          },
          {
            name: "Razones trigonométricas de un ángulo agudo en un triángulo rectángulo",
          },
          {
            name: "Razones trigonométricas en la circunferencia unitaria",
          },
          {
            name: "Triángulo rectángulo",
            description:
              "Teorema de Pitágoras y su recíproco. Triángulos semejantes.",
          },
          {
            name: "Triángulos semejantes",
            description: "Teoremas de Tales de Mileto. Aplicaciones.",
          },
          {
            name: "Ley de los senos y Ley de los Cosenos",
          },
          {
            name: "Trigonometría del triángulo rectángulo",
            description: "Resolución de triángulos Rectángulos.",
          },
          {
            name: "Cuadrantes y signos de las razones trigonométricas",
          },
          {
            name: "Valores de las funciones trigonométricas para ángulos notables",
          },
          {
            name: "Ángulos complementarios, ángulos que difieren en 90°, ángulos suplementarios, ángulos que difieren en 180°, ángulos opuestos, reducción al primer cuadrante",
          },
          {
            name: "Graficación de seno, coseno, tangente, cotangente, secante, cosecante",
            description:
              "En cada caso estudiar: período, Max, Min, acotación, crecimiento, decrecimiento.",
          },
          {
            name: "Identidades trigonométricas",
            description: "Fundamentales y otras.",
          },
          {
            name: "Fórmulas trigonométricas",
            description:
              "Razones de la suma y la diferencia de ángulos, razones de los ángulos doble y mitad.",
          },
          {
            name: "Identidades trigonométricas Ejercicios",
          },
          {
            name: "Ecuaciones trigonométricas",
          },
        ],
      },
    ],
  },
  {
    id: 18,
    classname: "Nivelación: Física",
    description:
      "La física es la ciencia cuyo objetivo es observar el mundo para encontrar patrones y principios que los describan. Dada la amplitud de los temas que estudia la física y su evolución histórica, muchas ciencias posteriores se fundamentan en ella. Es por esto por lo que la física se puede considerar una ciencia básica.",
    units: [
      {
        name: "Introducción",
        topics: [
          {
            name: "¿Qué es la Física?",
            description:
              "La Física como ciencia. El campo de estudio de la Física. El método científico.",
          },
          {
            name: "Estándares y Unidades",
            description:
              "La magnitud en la ciencia, Las unidades de medida Los sistemas de unidades, El sistema internacional de unidades, La notación científica, Los prefijos en el SI.",
          },
        ],
      },
      {
        name: "Magnitudes y vectores",
        topics: [
          {
            name: "Conversión de Unidades",
            description:
              "Técnica Científica para realizar conversión de unidades. Ejercicios de conversión de unidades.",
          },
          {
            name: "Análisis Dimensional",
            description:
              "Simbología Dimensional, Ecuaciones dimensionales, Ejercicios de análisis dimensional.",
          },
          {
            name: "Clasificación de magnitudes",
            description:
              "Magnitudes escalares y vectoriales, Operaciones con magnitudes escalares.",
          },
          {
            name: "Representación y expresiones analíticas de magnitudes vectoriales",
            description:
              "Representación gráfica, Expresiones analíticas, Coordenadas rectangulares Coordenadas polares.",
          },
          {
            name: "Suma de Vectores",
            description:
              "Métodos gráficos y analíticos para suma y resta de vectores.",
          },
          {
            name: "Producto de un escalar por un vector",
            description:
              "Producto entre vectores: Producto punto o escalar, Producto cruz o vectorial. Aplicaciones de los productos de vectores.",
          },
        ],
      },
      {
        name: "Cinemática",
        topics: [
          {
            name: "Generalidades Cinemática",
            description: "¿qué estudia? Partícula, Espacio, Tiempo.",
          },
          {
            name: "Sistemas de Referencia",
          },
          {
            name: "Vector Posición, Vector Desplazamiento",
            description: "Distancia recorrida. Ecuación trayectoria.",
          },
          {
            name: "Tipos de movimiento",
            description:
              "Rapidez y Velocidad. Rapidez Media e instantánea, Vector velocidad. Velocidad media. Velocidad instantánea. Ejercicios de movimiento con velocidad constante.",
          },
          {
            name: "Aceleración",
            description:
              "Vector aceleración. Aceleración media. Aceleración instantánea. Aceleración total.",
          },
          {
            name: "Movimiento con aceleración constante",
            description:
              "Ejercicios de movimiento con aceleración constante. Movimiento vertical: caída libre y lanzamiento vertical Ejercicios de movimiento vertical.",
          },
          {
            name: "Trayectoria y gráficas de cinemática",
            description:
              "Gráficos posición Vs. Tiempo. Gráficos velocidad Vs. Tiempo. Gráficos aceleración Vs Tiempo. Trayectoria de un movimiento.",
          },
          {
            name: "Cinemática en dos dimensiones",
            description: "Movimiento parabólico, Ejercicios.",
          },
          {
            name: "Movimiento circular uniforme y uniformemente variado",
            description:
              "Magnitudes en el movimiento circular Ejercicios de movimiento circular.",
          },
        ],
      },
      {
        name: "Dinámica",
        topics: [
          {
            name: "Causas del movimiento y efectos del movimiento",
            description:
              "¿Quién o qué causó la aceleración? Fuerzas de la naturaleza, gravitación, electrostática, nuclear débil, nuclear fuerte. La inercia. La masa. La fuerza neta. Tipos de fuerzas.",
          },
          {
            name: "Leyes de Newton",
          },
          {
            name: "Aplicaciones de las leyes de Newton",
            description:
              "Fuerza de fricción. Ejercicios de aplicación de las leyes de Newton.",
          },
        ],
      },
    ],
  },
  {
    id: 19,
    classname: "Nivelación: Química",
    description:
      "Esta asignatura se imparte dentro de la Nivelación de Carrera en la Universidad de Investigación de Tecnología Experimental Yachay Tech. El propósito es homologar el perfil del estudiante mediante los conocimientos de Química adquiridos durante sus estudios previos y así fortalecer las competencias académicas y generar un estudiante crítico, propositivo y comprometido con la investigación y producción de conocimiento en el ingreso a la Universidad de Yachay Tech, y que en determinados aspectos los complemente con la formación recibida por las otras asignaturas recibidas en la Nivelación de carrera como son Comprensión lectora, Física, Fundamentos de Matemáticas e Inglés. De esta manera, se establecerán los fundamentos imprescindibles para que el estudiante transite con éxito a estudios posteriores. Se abordarán abordan temas como los elementos básicos como la descripción de la materia, la estructura atómica, la tabla periódica, formulación y nomenclatura, estequiometria y disoluciones.",
    units: [
      {
        name: "Naturaleza y propiedades de la materia",
        topics: [
          {
            name: "El enfoque científico del conocimiento",
          },
          {
            name: "Clasificación de la Materia",
            description:
              "Estados de la materia, Clasificación de la materia, Separación de mezclas.",
          },
          {
            name: "Cambios físicos y químicos y propiedades físicas y químicas",
          },
          {
            name: "Calculando densidad",
          },
          {
            name: "Composición porcentual en masa",
          },
          {
            name: "Factores de conversión de fórmulas químicas",
          },
          {
            name: "Determinación de una fórmula química",
            description:
              "Determinación de fórmulas moleculares de compuestos, Análisis por combustión.",
          },
        ],
      },
      {
        name: "Reacciones químicas y su estequiometría",
        topics: [
          {
            name: "Teoría Atómica Moderna",
            description:
              "Ley de conservación de masas, Ley de proporciones definidas, Ley de proporciones múltiples, Dalton y la teoría atómica.",
          },
          {
            name: "Escribir y equilibrar ecuaciones químicas",
          },
          {
            name: "Reacciones estequiométricas",
            description:
              "Conversiones de mol a mol, Conversiones de masa a masa.",
          },
          {
            name: "Relaciones estequiométricas",
            description:
              "Reactivo limitante, Reactivo en exceso, Rendimiento teórico, Rendimiento porcentual.",
          },
          {
            name: "Reacciones químicas",
            description:
              "Reacciones de combustión, Reacciones de metales alcalinos, Reacciones de halógenos.",
          },
        ],
      },
      {
        name: "Introducción a reacciones en disoluciones acuosas",
        topics: [
          {
            name: "Concentración de una solución",
            description: "Molaridad, Dilución.",
          },
          {
            name: "Estequiometría en disoluciones",
          },
          {
            name: "Tipos de soluciones acuosas y solubilidad",
            description:
              "Soluciones electrolíticas y no electrolíticas, Solubilidad de compuestos iónicos.",
          },
          {
            name: "Reacciones de precipitación",
          },
          {
            name: "Representando reacciones acuosas",
            description: "Ecuaciones moleculares, iónicas y iónicas netas.",
          },
          {
            name: "Reacciones acido base",
            description: "Titulaciones ácido-base.",
          },
          {
            name: "Reacciones de evolución de gas",
          },
          {
            name: "Reacciones Redox",
            description:
              "Identificación de reacciones redox, Serie de actividad.",
          },
        ],
      },
      {
        name: "Gases",
        topics: [
          {
            name: "Presión",
            description: "Unidades, Manómetro.",
          },
          {
            name: "Leyes simples de los gases",
            description: "Ley de Boyle, Ley de Charles, Ley de Avogadro.",
          },
          {
            name: "Ley de los gases ideales",
          },
          {
            name: "Aplicaciones de la Ley de gas ideal",
            description: "Volumen molar, Densidad, Masa molar.",
          },
          {
            name: "Mezcla de gases y presiones parciales",
          },
          {
            name: "Gases en reacciones químicas: estequiometría",
            description: "Volumen molar y estequiometría.",
          },
          {
            name: "Teoría Cinética Molecular",
            description: "Un modelo para gases.",
          },
        ],
      },
      {
        name: "Principios de termoquímica",
        topics: [
          {
            name: "Naturaleza de la Energía",
            description:
              "Definición y tipos de energía, Conservación y transferencia de la energía, Unidades de energía.",
          },
          {
            name: "Primera ley de la termodinámica",
            description: "Energía interna, Calor y trabajo.",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    classname: "Física II",
    description:
      "La asignatura de física II es esencial en toda carrera científica desde sus inicios. En esta asignatura se realizará una introducción a los conceptos de oscilaciones mecánicas. Se introducen los conceptos y leyes que rigen los circuitos eléctricos con dispositivos pasivos. Luego de esto se introduce el magnetismo y como este está vinculado a la corriente eléctrica, al final se estudia la óptica geométrica. Todos estos nuevos conceptos son abordados desde un punto de vista del formalismo físico matemático. Los conceptos estudiados forman la base del conocimiento en muchas otras disciplinas y conseguir un dominio de estos es esencial para sentar las bases de sobre las cuales desarrollar una carrera científica.",
    units: [
      {
        name: "Movimiento armónico",
        topics: [
          {
            name: "Movimiento periódico",
            description:
              "Movimiento armónico simple. Energía del oscilador armónico. Péndulo simple, compuesto y torsional. Oscilaciones amortiguadas y forzadas. Ondas. Energía de una onda sinusoidal. La ecuación lineal de una Onda.",
          },
        ],
      },
      {
        name: "Electrostática",
        topics: [
          {
            name: "Cargas eléctricas",
            description: "Ley de Coulomb.",
          },
          {
            name: "Campo Eléctrico",
            description:
              "Líneas de campo eléctrico. Ley de Gauss. Conductores y equilibrio electrostático. Potencial eléctrico. Diferencia de potencial. Valor del campo eléctrico a partir de un Potencial eléctrico. Potencial eléctrico debido a una distribución de carga eléctrica. Aplicaciones de la Electrostática.",
          },
        ],
      },
      {
        name: "Circuitos",
        topics: [
          {
            name: "Capacitancia",
            description:
              "Capacitadores en serie y en paralelo. Energía almacenada en capacitadores Dieléctricos.",
          },
          {
            name: "Corriente eléctrica",
            description:
              "Resistencia y Ley de Ohm. Resistividad. Superconductores. Fuentes de poder y Voltaje. Resistencias en serie y en paralelo. Leyes de Kirchhoff. Circuitos RC. Voltímetros y Amperímetros.",
          },
        ],
      },
      {
        name: "Magnetismo",
        topics: [
          {
            name: "Campo magnético",
            description:
              "Fuerza magnética. Imanes. Fuerza sobre un conductor por el que pasa una corriente. Torque sobre un circuito. Efecto Hall. Dipolo magnético. Campo magnético debido a corrientes. Ley de Biot-Savart. Ley de Ampere. Solenoides.",
          },
        ],
      },
      {
        name: "Inducción e Inductancia",
        topics: [
          {
            name: "Ley de Gauss en el magnetismo",
            description:
              "Ley de Faraday. Ley de Lenz. Autoinducción e inductancia. Energía en un campo magnético. Circuitos RL Inductancia mutua. Circuitos RLC.",
          },
        ],
      },
      {
        name: "Óptica",
        topics: [
          {
            name: "Naturaleza de la Luz",
            description:
              "Óptica Geométrica. Reflexión. Refracción. Ley de Snell. Principio de Huygens. Dispersión de la luz. Reflexión total interna. Principio de Fermat.",
          },
        ],
      },
    ],
  },
];
