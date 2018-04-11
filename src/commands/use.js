import { remoteHelpers } from '../managers/GitRemoteManager'

/*
type Plugin {
  name: string,
  protocols: string[],
  remoteHelper: function
}
*/

export async function use (plugin) {
  if (plugin.remoteHelper) {
    for (const proto of plugin.remoteHelper.protocols) {
      if (remoteHelpers.has(proto)) {
        console.log(`WARN: isomorphic-git plugin ${plugin.name} registered the "${proto}" protocol overriding the ${remoteHelpers.get(proto).name} plugin which previously handled that protocol.`)
      }
      remoteHelpers.set(proto, plugin)
    }
  }
}
