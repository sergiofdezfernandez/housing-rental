import { BigNumber, ethers } from 'ethers';

export async function euroToGwei(euroAmount: number): Promise<BigNumber> {
  const ethEurRate = await fetchEthEurRate();
  if (!ethEurRate || ethEurRate <= 0) {
    throw new Error('Invalid ETH to € exchange rate');
  }
  const ethValue = euroAmount / ethEurRate;
  const gweiValue = ethers.utils.parseUnits(ethValue.toString(), 'ether');
  return gweiValue;
}

export async function fetchEthEurRate(): Promise<number> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur'
    );
    const data = await response.json();
    const ethPriceInEur = data.ethereum.eur;

    if (!ethPriceInEur) {
      throw new Error('Failed to retrieve ETH to EUR rate');
    }

    return ethPriceInEur;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error; // Re-throw for caller to handle
  }
}
