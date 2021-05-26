#
# Team: Team 47
# City: Melbourne
# Xiaoyu Wu (1218098)    
# Yifei Yang (1136477)
# Rui Chen (1100500)
# Wenhai Huo (1101297)
# Jingyuan Ma (988014)
#

"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()
