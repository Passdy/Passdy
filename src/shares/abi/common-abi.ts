export const erc20ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function transfer(address to, uint amount) returns (boolean)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function mint(uint256 _value) external',
  // 'function mint(address account, uint256 amount) external',
];
