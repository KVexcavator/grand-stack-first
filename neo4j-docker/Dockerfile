FROM neo4j:5.16

ENV NEO4J_AUTH=${NEO4J_USER}/${NEO4J_PASSWORD}

USER root
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/lib/neo4j/plugins && \
    curl -L https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/5.16.0/apoc-5.16.0-extended.jar \
    -o /var/lib/neo4j/plugins/apoc.jar

# Добавляем нужные параметры в конфиг Neo4j
RUN echo "dbms.security.procedures.unrestricted=apoc.*,gds.*" >> /var/lib/neo4j/conf/neo4j.conf && echo "dbms.security.procedures.allowlist=apoc.*,gds.*" >> /var/lib/neo4j/conf/neo4j.conf 


CMD ["neo4j"]