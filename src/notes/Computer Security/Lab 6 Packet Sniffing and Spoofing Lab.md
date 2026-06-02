
#### What is a Packet?
A small unit of data transmitted over time a network. In digital communications, when information is sent across network, it's often too large to be transmitted all at once, so it is broken down into smaller chunks, called packets. These packets travel independently to the destination, where they are reassembled into the original data.

##### Type of Packets 
1. IP Packet: Used fro routing data between device in different networks
2. TCP Packet: Used for reliable communication, ensuring data is delivered in the correct order
3. UDP Packet: Used for faster, connectionless communication, where delivery order in not guaranteed
4. ICMP Packet: Used for network diagnostics (e.g., `ping` requests and replies)
#### Packet Spoofing
Packet sniffing is the process of intercepting and logging the network traffic that passes over a network. Tools like Wireshark and tcpdump are commonly used to capture packets and analyze them. 


#### What is Sniffing and Spoofing?

| Aspect     | Sniffing                                                      | Spoofing                                                     |
| ---------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| Definition | Intercepting and monitoring network traffic                   | Falsifying network information to deceive or impersonate     |
| Purpose    | To capture and analyze data for security or troubleshooting   | To impersonate a trusted source or hide the real source      |
| Tools Used | Wireshark, tcpdump, and other packet sniffers                 | Scapy (for IP spoofing), Fake AP tools, email spoofing tools |
| Common Use | Network diagnostics, traffic analysis, packet capture         | Network attacks, impersonation, Man-in-the-Middle attacks    |
| Legality   | Legal when done with permission or in controlled environments | Often illegal, especially when used for malicious intent     |
Sniffing -> monitoring and capturing data from a network, typically for legitimate purposes like troubleshooting or security monitoring. However, it can also be sued by attackers to gather sensitive information. 

Spoofing -> faking a device or identity on the network, commonly used in attacks like DoS or MITM attacks. It is often malicious and deceptive in nature. 

#### What is Scapy?
Scapy is a interactive Python-based tool used for network packet manipulation, analysis, and testing. It allows user to create, send, capture, and analyze network packets in a variety of formats and protocols, making it an essential tool for network engineers, security researchers, and penetration testers.

| Key Features             | Description                                                                                                                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Packet Creation          | Can build packets from scratch, modify existing packets, or combine different protocols to construct complex packet structures (e.g., TCP packets with custom headers).                                                           |
| Packet Sending           | Once packets are created, Scapy can send them over the network. This makes it useful for tasks like networking testing, fuzzing, and simulating network traffic.                                                                  |
| Packet Sniffing          | Scapy can capture packets from the network interface using sniffing functions. This makes it useful for network analysis and security auditing. <br>It supports a wide range of protocols (e.g., TCP, UDP, ICMP, ARP, DNS, etc.). |
| Packet Analysis          | After capturing packets, Scapy can analyze the data by displaying the details of the packet and its contents (headers, payload, flags, etc.). It also support protocol dissection and can decode the field of a packet            |
| Manipulation and Editing | Scapy allows you to modify network packets after capturing them. You can change headers, reassemble fragmented packets, or create responses based on sniffed data.                                                                |
| Scripting and Automation | As a python-based tool, Scapy allows you to automate complex network tasks by scripting interactions with network. This is useful for creating tests, simulating attack, or automating routine network, administration tasks.     |
| Wide Protocol Support    | Scapy supports a vest range of network protocols, including IP, TCP, UDP, ICMP, ARP, DNS, HTTP, FTP, and more. This make it a highly versatile tool for a wide variety of network tasks.                                          |
Using ping will give the attacker the following information 
##### **Breakdown of the Captured Packet:**

1. **Ethernet Header**:
    
    - **dst (Destination MAC Address)**: `02:42:0a:09:00:05` (Destination MAC address for the Ethernet frame).
    - **src (Source MAC Address)**: `02:42:0a:2b:05:c6` (Source MAC address of the sender).
    - **type**: `IPv4` (Indicates the type of the data being carried; in this case, it's an IPv4 packet).
2. **IP Header**:
    
    - **version**: `4` (IPv4).
    - **ihl (Internet Header Length)**: `5` (The length of the IP header in 32-bit words).
    - **tos (Type of Service)**: `0x0` (Indicates how the packet should be treated in terms of priority).
    - **len**: `84` (Total length of the packet, including the header and data).
    - **id**: `1769` (Identification field, used to reassemble fragmented packets).
    - **ttl (Time to Live)**: `64` (The maximum number of hops the packet can make before being discarded).
    - **proto (Protocol)**: `icmp` (The packet is an ICMP packet, used for ping).
    - **src (Source IP Address)**: `10.9.0.5` (Source address of the packet).
    - **dst (Destination IP Address)**: `10.9.0.1` (Destination address of the packet).
3. **ICMP Header**:
    
    - **type**: `echo-request` (ICMP type 8, which corresponds to a ping request).
    - **code**: `0` (No specific error; just the echo request).
    - **checksum**: `0x5308` (Used for error-checking of the ICMP message).
    - **id**: `0x1b` (Identification field for the ICMP packet).
    - **seq**: `0x1d` (Sequence number of the packet to track the order).
4. **Raw Data (Payload)**:
    
    - The **load** part represents the **payload** data being transmitted, which in this case is part of the ICMP message. The raw bytes are shown in hexadecimal, which is the actual content of the packet being transmitted.

### **Key Observations**:

- The **ICMP Echo Request** packet is sent from `10.9.0.5` to `10.9.0.1`.
- The packet is an **Echo Request**, which is used by the **ping** command to check network connectivity.
- The **ICMP Echo Reply** message is displayed after the Echo Request, with the same details but reversed: the source and destination IPs are swapped.
- The packet is carrying a **payload**, which contains the actual data being sent in the ICMP message.


the code for task 1.1
**![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeOwd2KTTIelGIfBc0igCizKYJmCdf4UJff4s-O8W3EL65YG183kw9k82dSek24CNJOCo0ngFprG8O9y3VcGDJDyomQuKT5eHlqUlvfsTwqNKVSfe4_MuEFZCNH_mTYSixK_yliAQ?key=dGcNJgjqslP_1tsWl0H6OIPo)
`pkt = sniff(iface='br-f89cc5e6538a, filter='icmp, prn=print_pkt)`

sniff()-> captures network packets in real-time
iface='br-f89cc5e6538a' specifies the network interface to capture packets from (in this case, a Docker bridge interface)
filter='icmp' -> captures only ICPM packets (e.g., ping request/replies).
prn=print_pkt  -> calls the print_pkt function for each captured packet, which processes or displays the packets details

for the other example they just catch differ types that are listed above in the notes 

#### Task 1.2
![[Pasted image 20241120104644.png]]In this code we are 

This code is used to spoof ICMP echo request (ping request) packets. It creates a fake ICMP packet with a specified source IP (`src_ip`) and destination IP (`destination_ip`) and then send it over using the `send()` function.


Task 1.3 
![[Pasted image 20241120105707.png]]
In this code performs traceroute operation using Scapy by sending ICMP echo request with increasing TTL (time to live) values. TTL is a field in the IP header of a packet that specifies the maximum number of hops (router) a packet can pass through before being discarded. each router that fordwards the packet reduces the TTL by 1. if the ttl reaches 0, the packet is discarded, preventing it from circulating indefinitely in the network. 
Loop over the TTL: the code loops over TTL starting at 1 and increase to 29 represenign the number of hops
Packet Creation: for each TTL value, an ICMP request packet is created with that specific TTL and destination IP. 
Sending and Waiting for Reply: if a reply is received, the source IP (router or destination) is displayed. if no reply is received, it prints *
Stopping Condtion: the loop stops when the reply comes from the destination IP, indicating the packet reached the destination


Task 1.4 
![[Pasted image 20241120110825.png]]
What this code does is it get the network traffic and filter all the ICMP packet that have the type request. 
Using that packet it will get the detailed in particular the IP that the packet came from and automatically sent a spoofed reply back to the same IP 

the `IP(src=pkt[IP].dst, dst=pkt[IP].src)` constructs the IP header of the spoofed reply, swapping the source and destination IP addresses.