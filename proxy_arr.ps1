import socket
import threading
import subprocess

def forward(src, dst):
    try:
        while True:
            data = src.recv(8192)
            if not data: break
            dst.sendall(data)
    except:
        pass
    finally:
        src.close()
        dst.close()

def handle(client, target_port):
    try:
        dst = socket.socket()
        dst.connect(('127.0.0.1', target_port))
        t1 = threading.Thread(target=forward, args=(client, dst), daemon=True)
        t2 = threading.Thread(target=forward, args=(dst, client), daemon=True)
        t1.start()
        t2.start()
    except:
        client.close()

ports = {
    8989: ('sonarr'),
    7878: ('radarr'),
    9117: ('jackett'),
    5055: ('jellyseerr'),
}

sockets = []
threads = []

for port in ports:
    try:
        s = socket.socket()
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(('0.0.0.0', port))
        s.listen(5)
        sockets.append(s)
        print(f"Proxy listening on port {port} -> {ports[port]}")
    except Exception as e:
        print(f"Port {port} failed: {e}")

while True:
    for s in sockets:
        try:
            client, _ = s.accept()
            t = threading.Thread(target=handle, args=(client, s.getsockname()[1]), daemon=True)
            t.start()
        except:
            pass