# poo_javascript_physics_engine

Para compilar a javascript:

        npm install
        npm run build
        
Para live reload:
        npm run start
        
Para correr los tests:
        npm run test

Después de compilar, se puede abrir el archivo `public/index.html` 

MOTOR DE FÍSICAS 2D

Integrantes: Julián Archila, David Daza y Santiago Botero.

Introducción: Nuestro proyecto consistió en el desarrollo de un motor de físicas en 2D con la implementación de un sistema de colisiones y de fuerzas. Todo esto se hizo usando Typescript.

Propósito: Desarrollar un motor de físicas en 2D.

Antecedentes: Tras la previa creación del Tangram, nos pareció realmente interesante la creación de figuras geométricas con las que el usuario pudiera interactuar, por lo que quisimos generalizar un poco este concepto y llevarlo más allá hasta el desarrollo de un motor de físicas en 2D que facilitara la implementación de colisiones y fuerzas para bien sea un videojuego o para lo que el usuario crea útil su uso.
A continuación, adjuntaremos las referencias y videos que nos fueron realmente útiles:

•	https://gamedevelopment.tutsplus.com/es/tutorials/how-to-create-a-custom-2d-physics-engine-oriented-rigid-bodies--gamedev-8032

•	https://box2d.org/documentation/

•	https://brm.io/matter-js/

•	https://www.youtube.com/watch?v=iHJhdrrcA0s&list=PLM-p96nOrGcZv2ji6YYPMt8INypYnIUR2

Desarrollo: Partimos con la creación de las primitivas, esto lo hicimos con clases, además de ello definimos diferentes métodos que facilitarían la creación del sistema de colisiones. 

Con las primitivas hechas, pasamos al sistema de colisiones, para el cual nos fue bastante útil crear una utilidad para los vectores (definir la clase vector y crear métodos para calcular el producto, la suma, la normalización de vectores, etc.) lo que facilita bastante el cálculo de las intersecciones entre las diferentes primitivas. Cabe aclarar que para el cálculo de las intersecciones fue necesario un poco de conocimiento básico de álgebra lineal e hicimos pruebas unitarias para cada función con el fin de facilitar la corrección del código.

Para el sistema de fuerzas a grandes rasgos lo que se tuvo que hacer fue calcular leyes de Newton con operaciones entre vectores y cálculo de Deltas.

Conclusiones: 

•	La programación orientada a objetos es bastante útil para crear código reutilizable y fácil de arreglar o modificar.

•	El álgebra lineal optimiza bastante el cálculo de operaciones que involucren rectas y puntos, su conocimiento facilita la resolución de problemas   geométricos.

Trabajo	futuro: Crear un videojuego usando netamente el motor de físicas en 2D.	
