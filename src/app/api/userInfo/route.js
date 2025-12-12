import dbConnect from '@/lib/mongoose';
import User from '@/models/Users/User';
const countUsers = async () => {
    const user_count = await User.countDocuments();
    const male_users = await User.find({ gender: 'Male' }).countDocuments();
    const female_users = await User.find({ gender: 'Female' }).countDocuments();
    return { user_count, male_users, female_users };
}

export async function POST(req) {
    const { getCount } = await req.json();
    if (getCount) {
        await dbConnect();
        const { user_count, male_users, female_users } = await countUsers();
        return new Response(JSON.stringify({ user_count, male_users, female_users }), { status: 201 });
    }
}