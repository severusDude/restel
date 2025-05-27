<?php

namespace App\Helpers;

class CurrencyHelper
{
    public static function formatRupiah($amount)
    {
        return 'Rp ' . number_format($amount, 0, ',', '.');
    }
} 