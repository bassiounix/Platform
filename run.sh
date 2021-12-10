clear;
# To start mysqld on ArtixLinux
# !exec as root: mysqld_safe --datadir='/var/lib/mysql'
deno run --allow-net --allow-env --allow-read --import-map=import_map.json ./app.ts;
