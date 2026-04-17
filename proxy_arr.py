import socket, threading

def forward(s1, s2):
    try:
        while True:
            d = s1.recv(8192)
            if not d: break
            s2.sendall(d)
    except: pass
    finally: s1.close(); s2.close()

def handle(c, port):
    try:
        p = socket.socket()
        p.connect(('127.0.0.1', port))
        t1 = threading.Thread(target=forward, args=(c, p), daemon=True)
        t2 = threading.Thread(target=forward, args=(p, c), daemon=True)
        t1.start(); t2.start()
    except: c.close()

socks = []
for port in [8989, 7878, 9117, 5055]:
    try:
        s = socket.socket()
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(('0.0.0.0', port))
        s.listen(5)
        socks.append((s, port))
        print(f"Proxy on {port}")
    except Exception as e:
        print(f"port {port}: {e}")

while True:
    for s, port in socks:
        try:
            c, _ = s.accept()
            handle(c, port)
        except: pass