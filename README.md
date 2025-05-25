**README.md**

Aquest projecte inclou un script en Node.js (ES modules) anomenat `createDirs.mjs` que llegeix un fitxer de text amb una estructura de directoris (format indentat amb espais o ASCII-tree) i crea recursivament tots els directoris indicats.

## Característiques

* Processa dos formats d'entrada:

  * **Indentació amb espais**: cada nivell es defineix amb un nombre constant d'espais d'indentació.
  * **ASCII-tree**: amb símbols `├──`, `└──`, i línies verticals `│`.
* Ignora fitxers que tinguin extensió (per exemple `.ejs`) i mostra un missatge informatiu.
* Mostra missatges a la consola per cada acció:

  * `✅ Creant: <ruta>` quan crea un directori.
  * `⚠️  Ja existeix: <ruta>` si el directori ja hi era.
  * `ℹ️  S'ignora fitxer: <nomFitxer>` si detecta un fitxer.
* Opcionalment, permet indicar un directori arrel on generar l'estructura.
* Suporta l'opció `-h` o `--help` per mostrar instruccions d'ús.

## Requisits
    Opcio 1 si es vol executar com un script de Node.js
        * Node.js (versió ≥ 14) 
    Opcio 2 si el volem convertir en un executable
        * Bun (ultima versió)

## Instal·lació

1. Copia o descarrega `createDirs.mjs` al teu sistema.
2. Fes-lo executable (opcional):

   ```bash
   chmod +x createDirs.mjs
   ```

## Ús

```bash
node createDirs.mjs [options] <fitxer_estructura> [directori_destí]
```

* `<fitxer_estructura>`: Fitxer de text amb l'arbre de directoris. Pots usar espais per indentar o el format ASCII-tree.
* `[directori_destí]`: Carpeta arrel on crear l'estructura. Si no s'especifica, s'utilitza el directori de treball actual.

### Opcions

* `-h`, `--help`: Mostra aquesta ajuda i surt.

### Exemples

1. Crear l'estructura des del directori actual:

   ```bash
   node createDirs.mjs arbre.txt
   ```
2. Crear l'estructura a un directori concret:

   ```bash
   node createDirs.mjs arbre.txt /home/usuari/projecte
   ```
3. Mostrar ajuda:

   ```bash
   node createDirs.mjs --help
   ```

## Formats d'entrada acceptats

### 1. Indentació amb espais

```text
projecte
  src
    controllers
    models
  public
    css
    js
```

### 2. ASCII-tree

```text
├── src/
│   ├── config/
│   ├── controllers/
│   └── routes/
└── public/
    ├── css/
    ├── js/
    └── images/
```

## Com funciona internament

1. Llegeix totes les línies del fitxer i ignora línies buides.
2. Detecta si és format ASCII-tree cercant `├──` o `└──` en alguna línia.
3. Calcula nivells segons la indentació o la posició de prefixos ASCII.
4. Construeix la ruta completa per a cada directori i, si no existeix, la crea.
5. Mostra missatges en temps real de creació, existència o ignorància de fitxers.

---

# Genrar executable
## Crear l'executable
- Instal·lar Bun
    Windows:
        tecla window+r
        powershell -c "irm bun.sh/install.ps1 | iex"

        o

        npm install -g bun

    Linux:
        curl -fsSL https://bun.sh/install | bash


- Genrar l'executable amb Bun
    bun build createDirs.mjs --compile --outfile createDirs.exe

- Instal·lació executable a "fitxers de programa"

    executar install.ps1
        Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
        .\install.ps1

    Després de la instal·lació, pots verificar que funciona:
    * Reinicia el terminal i prova:
        createDirs --help
    * o
        createDirs.exe estructura.txt

Executable: [createDirs.exe](https://github.com/qmrcat/create-directories/releases/tag/create)


*Script creat per automatitzar la generació d’arbres de directoris a partir d’una descripció simple en text.*
# create-directories
