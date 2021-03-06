const namehash = require('eth-ens-namehash').hash
const keccak_256 = require('js-sha3').keccak_256

const getContract = name => artifacts.require(name)
const keccak256 = (name) => '0x' + keccak_256(name)

contract('Constants', accounts => {
  let keccakConstants

  before(async () => {
    keccakConstants = await getContract('KeccakConstants').new()
  })

  it('checks kernel constants', async () => {
    const kernelConstants = await getContract('KernelConstants').new()

    assert.equal(await kernelConstants.CORE_NAMESPACE(), await keccakConstants.CORE_NAMESPACE(), "core namespace doesn't match")
    assert.equal(await kernelConstants.APP_BASES_NAMESPACE(), await keccakConstants.APP_BASES_NAMESPACE(), "base namespace doesn't match")
    assert.equal(await kernelConstants.APP_ADDR_NAMESPACE(), await keccakConstants.APP_ADDR_NAMESPACE(), "app namespace doesn't match")

    assert.equal(await kernelConstants.KERNEL_APP_ID(), await keccakConstants.KERNEL_APP_ID(), "kernel app id doesn't match")
    assert.equal(await kernelConstants.ACL_APP_ID(), await keccakConstants.ACL_APP_ID(), "acl app id doesn't match")

    const kernel = await getContract('Kernel').new(false)
    assert.equal(await kernel.APP_MANAGER_ROLE(), await keccakConstants.APP_MANAGER_ROLE(), "app manager role doesn't match")
    assert.equal(await kernel.DEFAULT_VAULT_APP_ID(), await keccakConstants.DEFAULT_VAULT_APP_ID(), "default vault id doesn't match")
  })

  it('checks ENS constants', async () => {
    const ensConstants = await getContract('ENSConstants').new()

    assert.equal(await ensConstants.ETH_TLD_LABEL(), await keccakConstants.ETH_TLD_LABEL(), "ETH tld label doesn't match")
    assert.equal(await ensConstants.ETH_TLD_NODE(), await keccakConstants.ETH_TLD_NODE(), "ETH tld node doesn't match")
    assert.equal(await ensConstants.PUBLIC_RESOLVER_LABEL(), await keccakConstants.PUBLIC_RESOLVER_LABEL(), "public resolver label doesn't match")
    assert.equal(await ensConstants.PUBLIC_RESOLVER_NODE(), await keccakConstants.PUBLIC_RESOLVER_NODE(), "public resolver node doesn't match")
  })

  it('checks APMRegistry constants', async () => {
    const apm = await getContract('APMRegistry').new()

    assert.equal(await apm.CREATE_REPO_ROLE(), await keccakConstants.CREATE_REPO_ROLE(), "create repo role doesn't match")
  })

  it('checks ACL constants', async () => {
    const acl = await getContract('ACL').new()

    assert.equal(await acl.CREATE_PERMISSIONS_ROLE(), await keccakConstants.CREATE_PERMISSIONS_ROLE(), "create permissions role doesn't match")
    assert.equal(await acl.EMPTY_PARAM_HASH(), await keccakConstants.EMPTY_PARAM_HASH(), "empty param hash doesn't match")
  })

  it('checks ENSSubdomainRegistrar constants', async () => {
    const ensRegistrar = await getContract('ENSSubdomainRegistrar').new()

    assert.equal(await ensRegistrar.CREATE_NAME_ROLE(), await keccakConstants.CREATE_NAME_ROLE(), "create name role doesn't match")
    assert.equal(await ensRegistrar.DELETE_NAME_ROLE(), await keccakConstants.DELETE_NAME_ROLE(), "delete name role doesn't match")
    assert.equal(await ensRegistrar.POINT_ROOTNODE_ROLE(), await keccakConstants.POINT_ROOTNODE_ROLE(), "point rootnode role doesn't match")
  })

  it('checks EVM Script constants', async () => {
    const evmScriptConstants = await getContract('EVMScriptRegistryConstants').new()

    assert.equal(await evmScriptConstants.EVMSCRIPT_REGISTRY_APP_ID(), await keccakConstants.EVMSCRIPT_REGISTRY_APP_ID(), "app id doesn't match")
  })

  it('checks EVM Script executor types', async () => {
    const callsScriptExecutor = await getContract('CallsScript').new()

    assert.equal(await callsScriptExecutor.executorType(), await keccakConstants.EVMSCRIPT_EXECUTOR_CALLS_SCRIPT(), "callscript executor type doesn't match")
  })

  it('checks EVMScriptRegistry constants', async () => {
    const evmScriptRegistry = await getContract('EVMScriptRegistry').new()

    assert.equal(await evmScriptRegistry.REGISTRY_ADD_EXECUTOR_ROLE(), await keccakConstants.REGISTRY_ADD_EXECUTOR_ROLE(), "registry add executor role doesn't match")
    assert.equal(await evmScriptRegistry.REGISTRY_MANAGER_ROLE(), await keccakConstants.REGISTRY_MANAGER_ROLE(), "registry manager role doesn't match")
  })

  it('checks Repo constants', async () => {
    const repo = await getContract('Repo').new()

    assert.equal(await repo.CREATE_VERSION_ROLE(), await keccakConstants.CREATE_VERSION_ROLE(), "create version role doesn't match")
  })

  it('checks AppStorage unstructured storage constants', async () => {
    const app = await getContract('AppStubStorage').new()

    assert.equal(await app.getKernelPosition(), await keccakConstants.kernelPosition(), "kernelPosition doesn't match")
    assert.equal(await app.getAppIdPosition(), await keccakConstants.appIdPosition(), "appIdPosition doesn't match")
    assert.equal(await app.getInitializationBlockPosition(), await keccakConstants.initializationBlockPosition(), "initializationBlockPosition doesn't match")
  })

  it('checks AppProxyPinned unstructured storage constants', async () => {
    // Set up AppStubPinnedStorage
    const fakeApp = await getContract('AppStub').new()
    const kernelMock = await getContract('KernelPinnedStorageMock').new(fakeApp.address)
    const app = await getContract('AppStubPinnedStorage').new(kernelMock.address)

    assert.equal(await app.getPinnedCodePosition(), await keccakConstants.pinnedCodePosition(), "pinnedCodePosition doesn't match")
  })
})
