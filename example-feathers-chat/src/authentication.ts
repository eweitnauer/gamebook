// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import type { Params } from '@feathersjs/feathers'
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'
import { oauth, OAuthStrategy } from '@feathersjs/authentication-oauth'
import type { OAuthProfile } from '@feathersjs/authentication-oauth'

import type { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

class GoogleStrategy extends OAuthStrategy {
  async getEntityQuery(profile: OAuthProfile, _params: Params) {
    return {
      $or: [{ googleId: profile.sub || profile.id }, { email: profile.email }]
    }
  }
  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    return {
      googleId: profile.sub || profile.id,
      name: profile.name,
      email: profile.email,
      picture: profile.picture
    }
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('google', new GoogleStrategy())

  app.use('authentication', authentication)
  app.configure(oauth())
}
