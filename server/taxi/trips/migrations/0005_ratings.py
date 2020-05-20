from django.db import migrations, models
import trips.models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0004_user_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='rating_by_driver',
            field=models.IntegerField(blank=True, null=True, validators=[trips.models.validate_rating]),
        ),
        migrations.AddField(
            model_name='trip',
            name='rating_by_rider',
            field=models.IntegerField(blank=True, null=True, validators=[trips.models.validate_rating]),
        ),
    ]
