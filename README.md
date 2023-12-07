## Proyecto de Arquitectura Limpia con NodeJS

### Pre Instalación

1. Descargar la imagen de mongodb al ejecutar el siguiente comando en la terminal

```bash
docker pull mongo:6.0.6
```

### Instalación

1. Clonar archivo **.env.template** y renombrar a **.env**.
2. Instalar dependencias.

```bash
npm install
```

3. Levantar la base de datos

```bash
docker-compose up -d
```

4. Ejecutar proyecto en modo desarrollo

```bash
npm run dev
```
