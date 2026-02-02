
export interface Agent {
    id: number
    owner_id: string
    name: string
    description: string | null
    price: number
    rental_price: number | null
    features: string[] | null
    image_url: string | null
    is_for_sale: boolean
    is_for_rent: boolean
    created_at: string
    category?: string // Adding optional category for filtering logic
}
