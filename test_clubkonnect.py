import asyncio
from app.services.bills import ClubKonnectBillsProvider
from app.core.config import settings
import logging

logging.basicConfig(level=logging.DEBUG)

async def run():
    provider = ClubKonnectBillsProvider(
        user_id=settings.CLUBKONNECT_USER_ID,
        api_key=settings.CLUBKONNECT_API_KEY
    )
    res = provider.fetch_exam_packages("waec")
    print(res)

asyncio.run(run())
