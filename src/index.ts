#!/usr/bin/env ts-node

import { Command } from 'commander';

const program = new Command();
import fs from 'fs-extra';

program
    .name('mi-herramienta')
    .description('Una herramienta para construir proyectos')
    .version('1.0.0');

program
    .command('crear <nombre> [ruta]')
    .description('Crea una carpeta para el proyecto en la ruta especificada')
    .action(async (nombre, ruta) => {
        const path = ruta || '.'; // ruta por defecto: directorio actual
        const projectPath = `${path}/${nombre}`;

        try {
            // 1. Creating root project folder
            await fs.ensureDir(projectPath);
            console.log(`Carpeta creada: ${projectPath}`);

            // Creating README.md
            await fs.outputFile(`${projectPath}/README.md`, `# ${nombre}\nEste es un proyecto generado automáticamente.`);

            // Creating basic package.json
            const packageJson = {
                name: nombre,
                version: '1.0.0',
                main: 'index.js',
                scripts: {
                    start: 'node index.js'
                }
            };
            await fs.outputJson(`${projectPath}/package.json`, packageJson, { spaces: 2 });


            // Aquí puedes agregar más lógica, como crear archivos iniciales, etc.
        } catch (error) {
            console.error('Error creando la carpeta:', error);
        }
    });

// Cuando ejecutas sin argumentos, muestra ayuda automáticamente
program.parse(process.argv);