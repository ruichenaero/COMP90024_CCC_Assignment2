#!/bin/bash

. unimelb-comp90024-2021-grp-47-openrc.sh

# Configure basic instances/nodes
ansible-playbook --ask-become-pass config_nectar.yaml 

# Deploy all instances/nodes environment
ansible-playbook --ask-become-pass deploy_nectar.yaml -i inventory/hosts.ini

# Lanuch nector application
ansible-playbook --ask-become-pass launch_nectar.yaml -i inventory/hosts.ini