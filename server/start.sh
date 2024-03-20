set -Eeuxo pipefail # https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" # https://stackoverflow.com/a/17744637

docker compose -p ollama down --remove-orphans
docker compose -p ollama up -d

if [ -f .env ]; then
    source .env
fi

# Use an environment variable with a default value of 'llama2'
MODEL_NAME=${MODEL_NAME:-llama2}

docker exec -it ollama ollama run "$MODEL_NAME"
