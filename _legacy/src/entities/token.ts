type SwMileageToken = {
  sw_mileage_token_id: string;
  sw_mileage_token_name: string;
  contract_address: string;
  sw_mileage_token_symbol: string;
  sw_mileage_token_decimals: number;
  sw_mileage_token_image_url: string;
  contract_owner_address: string;
  description: string;
  is_paused: number;
  is_activated: number;
  created_at: string;
  updated_at: string;
}

export type {
  SwMileageToken
}