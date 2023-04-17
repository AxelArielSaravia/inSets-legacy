# [inSets](https://insets-music.web.app/) v0.3.8
[¿Cómo se utiliza la aplicación?](https://github.com/AxelArielSaravia/inSets/blob/main/README.md#c%C3%B3mo-se-utiliza-la-aplicaci%C3%B3n)

Basada en [Web Audio API] y HTML Audio tag

### Aplicación de Composición Musical

**inSets** puede pensarse como un *sistema generativo estocástico e interactivo de música*. Y, para un público general, puede categorizarse como música experimental.

- La **generatividad** del sistema radica en que la aplicación decide cuándo ejecutar un sonido de manera aleatoria, como también, decide el conjunto de sonidos como la elección de qué sonido mediante una distribución arbitraria (por defecto uniforme, es decir aleatoria) de probabilidad. Además, el sistema decide de manera aleatoria que efectos se aplican a cada audio y su configuración. 

- La **interactividad** del sistema se sitúa en la posibilidad del usuario en redefinir los márgenes, es decir, los límites, de la aleatoriedad o distribución de probabilidad del sistema. Por ejemplo, podemos cambiar la probabilidad de ser seleccionado un audio, o podemos cambiar el intervalo que representa los valores posibles del efecto delay. También, se puede decidir que un efecto específico sea posible de aplicar o no para un audio o para todos los audios (por defecto todos los efectos son aplicables). Por ejemplo se puede decidir que el efecto de panner no se aplique a todos los audios.

inSets no genera sonido mediante síntesis y no utiliza un banco de sonidos almacenados. En términos reales inSets solo mezcla y transforma sonidos. Es necesario que para realizar esto último el propio usuario ingrese el audio. Por lo tanto tenemos una de las ideas fundamentales de inSets:

***Todo archivo de audio que sea reconocible por un navegador web está permitido***

Esto incluye por ejemplo los formatos mp4, wav, flac, aac, ogg, webm, entre otros.
Esta idea está impulsada específicamente para generar cierta familiaridad. El resultado musical del sistema es experimental, es decir, no refiere a lo que un público general acostumbra a escuchar (no utiliza un sistema métrico de distribución del tiempo, las agrupaciones son arbitrarias por lo que no generar melodías, entre otros), entonces esta medida intenta que por lo menos exista algún nivel de reconocimiento por parte del usuario (claramente si el usuario decide ingresar audios que no conoce ya es una decisión personal).

Teóricamente la aplicación puede funcionar sin tener ningún archivo de audio, pero claramente no va a generar ninguna respuesta audible.

Como se mencionó arriba, inSets no utiliza un sistema métrico de distribución del tiempo para la ejecución de sonidos. El sistema es más general y permisivo, simplemente se elige el valor disponible dentro del intervalo que representa el tiempo (que el usuario puede cambiar) sin restricciones. Cabe puntualizar que las medidas de tiempo se miden cada 100 milisegundos, es decir, que nunca puede ocurrir que el sistema elija 1123 milisegundos de tiempo, va  a elegir 1100 o 1200 milisegundos, y así. Aunque, en realidad, inSets puede llegar a generar una distribución métrica, específicamente pulsada, si se restringe el intervalo de tiempo a un solo valor.

## ¿Cómo se utiliza la aplicación?
### Añadir audios

- Opción 1: apretando en el botón **Add** y seleccionando el archivo de audio.

![open file 1](doc-media/open-file1.gif)

- Opción 2: arrastrando el archivo deseado a la pantalla.

![open file 2](doc-media/open-file2.gif)

### Iniciar y finalizar

- Iniciar apretando **Start**.

![Iniciar obra](doc-media/start.gif)


- Finalizar apretando **Stop**.

![Finalizar obra](doc-media/stop.gif)

**Notas:**

Cuando un audio o conjunto de audios son ejecutados por el sistema el borde de los mismos se colorea, en el caso de un conjunto, todos los audios del mismo tienen el mismo color. Los colores son decididos de manera aleatoria.

Un audio mantiene su color hasta que el sistema decide ejecutarlo de nuevo, llega al fin de su reproducción, el usuario finaliza la reproducción del audio o se finaliza el sistema. 

### Eliminar todos los audios

- Para eliminar todos los audio apretar el botón **Clear**.

![Elimiar todos los audios](doc-media/clearall.gif)

### Audio

![audio1](doc-media/audio.svg)

**Notas:**

El cambio de probabilidad de un audio solo se puede realizar si existe más de un audio dentro de la aplicación. Cuanto mayor es el número mayor es la probabilidad.

Los botones de efectos refieren a si es posible que se apliquen o no los mismos. En el caso del *panner* y el *rate* la posibilidad es 1 cuando están habilitados, es decir, siempre se aplican.

El efecto **rate** hace referencia a playback rate, que es la velocidad de muestreo. Cuando está habilitada aleatoriamente se cambia la velocidad de muestreo.

El efecto **REP** hace referencia a Random End Point, que es el punto aleatorio de fin. Está graficado como la delgada barra con dos círculos de la derecha. Cuando está habilitado decide aleatoriamente donde termina la reproducción. Sus límites son el RSP y el límite superior de tiempo del audio. 

El efecto **RSP** hace referencia a Random Start Point, que es el punto aleatorio de comienzo. Está graficado como la delgada barra con dos círculos de la izquierda. Cuando está habilitado decide aleatoriamente donde empieza la reproducción. Sus límites son el límite inferior de tiempo del audio y el REP. 

Tanto el límite inferior como el límite superior de  tiempo del audio, justamente, delimitan el tiempo posible de reproducción de  un audio. Estos se deshabilitan cuando el audio es menor a 1 segundo.

### Configuraciones generales de sistema

### Sets

Configuraciones de los conjunto de audios.
![audio sets](doc-media/audio-set.svg)

**Notas:**

El conjunto más grande de audios que es posible dentro de la aplicación es 15. Pueden incorporarse más de 15 audios pero como máximo la aplicación puede ejecutar 15 audios simultáneamente. Esta decisión es totalmente arbitraria. 

### Time

Configuración del tiempo a esperar por cada ejecución.
![time](doc-media/time.svg)

### Configuraciones generales de audios

Las configuraciones que siguen se refieren, en lo general, a los intervalos de donde saca la información el sistema para generar valores aleatorios, es decir, son los límites de la aleatoriedad del sistema. Y se aplican para todos los audios.

### Fades

Configuraciones de fade-in y fade-out.
![fades](doc-media/fades.svg)

### Delay

Configuración de delay.
![delay](doc-media/delay.svg)

### Filter

Configuración de filtros.
![filters](doc-media/filters.svg)

**Notas:**

En el caso de los filtros de bandpass y notch la frecuencia se refiere a la frecuencia media por la que se comienza a corta o deja pasar, respectivamente, las frecuencias agudas y graves. Y en el caso de de los filtros lowpass y highpass la frecuencia refiere al punto donde se cortan las frecuencias, si es lowpass se cortan las frecuencias agudas al punto y si es highpass las frecuencias graves al punto.

El **factor de calidad** (q factor) opera normalmente para bandpass y notch. En el caso de los tipos lowpass y highpass el factor de calidad se multiplica por la ganancia en el punto de corte. Es decir, cuando el factor de calidad se encuentra entre 0.1 y 0.9 la ganancia en el punto de corte baja, y cuando es mayor a 1 también lo es la ganancia en tal punto. 


### Panner

Configuración de paneo.
![panner](doc-media/panner.svg)

**Notas:**

En el **intervalo horizontal** los valores entre -50 y 0 son valores a la izquierda y los valores entre 0 y 50 refieren a valores a la derecha. Claramente 0 refiere al centro.

En el **intervalo vertical** los valores entre -50 y 0 son valores para abajo, mientras que los valores entre 0 y 50 son valores hacia arriba. Claramente 0 refiere al centro.

En el **intervalo de distancia** 0 es lo más cerca posible mientras más aumenta el valor más alejada es la posición.


### Pb Rate

Configuración de la velocidad de muestreo.
![playback rate](doc-media/rate.svg)

**Nota:**

Como dice el valor que se decide del intervalo se multiplica por la velocidad de muestreo original del audio, lo que resulta en el caso de que el valor sea menor a 1 y la velocidad sea menor, del caso contrario la velocidad es mayor. Un efecto que se genera con esto es el cambio de tono del audio.


### REP (Random End Point)

Configuración del punto aleatorio de fin.
![random end point](doc-media/REP.svg)


### RSP (Random Start Point)

Configuración del punto aleatorio de inicio.
![random start point](doc-media/RSP.svg)
