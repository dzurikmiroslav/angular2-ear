#!/bin/sh

JAVA_HOME="/usr/lib/jvm/java-7-oracle"

cd ng2demo-web
mvn compile com.sun.jersey.contribs:maven-wadl-plugin:generate

cd ../ng2demo-gui
$(npm bin)/rest-client-generator --output-file src/app/services/services.ts ../ng2demo-web/target/application.wadl
