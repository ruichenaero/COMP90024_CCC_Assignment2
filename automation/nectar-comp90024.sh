#
# Team: Team 47
# City: Melbourne
# Xiaoyu Wu (1218098)    
# Yifei Yang (1136477)
# Rui Chen (1100500)
# Wenhai Huo (1101297)
# Jingyuan Ma (988014)
#

#!/bin/bash

. unimelb-comp90024-2021-grp-47-openrc.sh

# Configure basic instances/nodes
ansible-playbook --ask-become-pass config_nectar.yaml 

# Deploy all instances/nodes environment
ansible-playbook --ask-become-pass deploy_nectar.yaml -i inventory/hosts.ini

# Lanuch nector application
ansible-playbook --ask-become-pass launch_nectar.yaml -i inventory/hosts.ini

# Scale up the system
ansible-playbook --ask-become-pass scale-up.yaml -i inventory/hosts.ini