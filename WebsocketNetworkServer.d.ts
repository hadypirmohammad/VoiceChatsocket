import WebSocket = require('ws');
import * as inet from './INetwork';
export interface IAppConfig {
    name: string;
    path: string;
    address_sharing?: boolean;
}
export interface IPoolDictionary {
    [path: string]: PeerPool;
}
/**
 * Gathers all data related to a single websocket.
 *
 */
export declare class Endpoint {
    ws: WebSocket;
    remoteAddress: string;
    remotePort: number;
    localAddress: string;
    localPort: number;
    appPath: string;
    getConnectionInfo(): string;
    getLocalConnectionInfo(): string;
}
export declare class WebsocketNetworkServer {
    private mPool;
    private static sVerboseLog;
    static SetLogLevel(verbose: boolean): void;
    static logv(msg: string): void;
    constructor();
    private onConnection;
    /**Adds a new websocket server that will be used to receive incoming connections for
     * the given apps.
     *
     * @param websocketServer server used for the incoming connections
     * @param appConfig app the incoming connections are allowed to connect to
     * Apps can be given multiple times with different signaling servers to support different
     * ports and protocols.
     */
    addSocketServer(websocketServer: WebSocket.Server, appConfigs: IAppConfig[]): void;
}
declare class PeerPool {
    private mConnections;
    private mServers;
    private mAddressSharing;
    private mAppConfig;
    private maxAddressLength;
    constructor(config: IAppConfig);
    hasAddressSharing(): boolean;
    add(ep: Endpoint): void;
    getServerConnection(address: string): SignalingPeer[];
    isAddressAvailable(address: string): boolean;
    addServer(client: SignalingPeer, address: string): void;
    removeServer(client: SignalingPeer, address: string): void;
    removeConnection(client: SignalingPeer): void;
    count(): number;
}
declare class SignalingPeer {
    private mConnectionPool;
    private mEndPoint;
    private mState;
    private mConnections;
    private mNextIncomingConnectionId;
    private mServerAddress;
    private mPingInterval;
    /**false = We are waiting for a pong. If it
     * stays false until the next ping interval
     * we disconnect.
     */
    private mPongReceived;
    static readonly PROTOCOL_VERSION = 2;
    static readonly PROTOCOL_VERSION_MIN = 1;
    private mRemoteProtocolVersion;
    constructor(pool: PeerPool, ep: Endpoint);
    GetLogPrefix(): string;
    private doPing;
    private evtToString;
    private onMessage;
    private sendToClient;
    private logOut;
    private logInc;
    private sendVersion;
    private sendHeartbeat;
    private internalSend;
    private onClose;
    private NoPongTimeout;
    private Cleanup;
    private parseMessage;
    private handleIncomingEvent;
    private internalAddIncomingPeer;
    private internalAddOutgoingPeer;
    private internalRemovePeer;
    private findPeerConnectionId;
    private nextConnectionId;
    connect(address: string, newConnectionId: inet.ConnectionId): void;
    connectJoin(address: string): void;
    disconnect(connectionId: inet.ConnectionId): void;
    startServer(address: string): void;
    stopServer(): void;
    private forwardMessage;
    sendData(id: inet.ConnectionId, msg: any, reliable: boolean): void;
}
export {};
