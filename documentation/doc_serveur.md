<div align="center">
    <h1>Server Connection and Management</h1>
</div>

This document explains how to configure access to the project server, manage files, and deploy code updates.

## Connect to the server (via Terminal)

### 1. Add the network route:

`sudo ip route add 192.168.110.0/24 via 10.192.12.11`

### 2. Launch the SSH connection:

`ssh omer@192.168.110.132`



## Manage files (via FileZilla)

### 1. Fill in the quickconnect bar at the top with this information:

- Hôte : sftp://192.168.110.132
- Username: omer
- Password: XXX
- Port : 22

### 2. Click on "Quickconnect". 
> Now, drag and drop your files.

### 3. Code directly on the server (via VS Code)

1. In VS Code, install the Remote - SSH extension.

2. Click on the green >< icon located at the very bottom left of the window.

3. In the menu that opens at the top, choose Connect to Host... then Add New Host....

4. Type the connection command:

 `ssh omer@192.168.110.132`

5. Choose the first configuration file proposed in the list to save the shortcut.

6. Click again on the >< icon at the bottom left, do "Connect to Host..." and select 192.168.110.132.

7. Once connected, go to the VS Code file explorer and do "Open Folder" to open the project folder.
   


### 4. Deploy updates (Frontend & Backend)
The project is divided into two parts that both need to run on the server.

#### 4.1 Update the public site (Apache Server - Frontend)
In the terminal connected to the server, run this command to deploy the changes:

`sudo cp -r ~/deforest/frontend/* /var/www/html/`


#### 4.2 Start the API (Node.js Server - Backend)
The Apache server does not manage the Global Forest Watch API. We need to start our own backend.

```bash
    cd ~/deforest/backend   
    npm install   
    node server.js   
```

> Make sure you have previously transferred the `.env` file into this folder via FileZilla. 






