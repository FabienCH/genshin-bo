cat > packer.json <<EOF
{
  "builders": [
    {
      "type": "openstack",
      "username": "$OS_USERNAME",
      "password": "$OS_PASSWORD",
      "identity_endpoint": "$OS_AUTH_URL",
      "region": "GRA11",
      "tenant_id": "$OS_TENANT_ID",
      "image_name": "genshin-bo/$RELEASE_VER",
      "ssh_username": "debian",
      "source_image": "$SOURCE_ID",
      "flavor": "$FLAVOR_ID",
      "ssh_ip_version": "4",
      "networks": [
        "$NETWORK_ID"
      ]
    }
  ],
  "provisioners": [
    {
      "destination": "/tmp/",
      "source": "./deploy",
      "type": "file"
    },
    {
      "destination": "/tmp/",
      "source": "./build",
      "type": "file"
    },
    {
      "script": "./deploy/deploy.sh",
      "type": "shell"
    }
  ]
}
EOF