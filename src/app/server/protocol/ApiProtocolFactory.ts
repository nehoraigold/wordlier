import { ServerConfig } from '../ServerConfig';
import { ApiProtocolType } from './ApiProtocolType';
import { CookieGameApiProtocol } from './CookieGameApiProtocol';
import { JsonBodyGameApiProtocol } from './JsonBodyGameApiProtocol';

export class ApiProtocolFactory {
    public static Create({ apiProtocolType }: ServerConfig) {
        switch (apiProtocolType) {
            case ApiProtocolType.COOKIE:
                return new CookieGameApiProtocol();
            case ApiProtocolType.JSON_BODY:
            default:
                return new JsonBodyGameApiProtocol();
        }
    }
}
