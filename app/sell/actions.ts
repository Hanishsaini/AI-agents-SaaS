
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createAgent(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const rentalPrice = formData.get('rental_price') ? parseFloat(formData.get('rental_price') as string) : null
    const imageUrl = formData.get('image_url') as string
    const category = formData.get('category') as string

    // Features are passed as comma-separated string
    const featuresString = formData.get('features') as string
    const features = featuresString ? featuresString.split(',').map(f => f.trim()).filter(f => f) : []

    const { error } = await supabase
        .from('agents')
        .insert({
            owner_id: user.id,
            name,
            description,
            price,
            rental_price: rentalPrice,
            image_url: imageUrl || null,
            features,
            category,
            is_for_sale: true,
            is_for_rent: !!rentalPrice
        })

    if (error) {
        console.error('Error creating agent:', error)
        throw new Error(error.message)
    }

    revalidatePath('/agents')
    revalidatePath('/studio')
    redirect('/studio')
}
