<?php

namespace App\Filament\Resources;

use App\Models\Property;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PropertyResource extends Resource
{
    protected static ?string $model = Property::class;
    protected static ?string $navigationIcon = 'heroicon-o-home';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('user_id')->relationship('user', 'name')->required(),
            Forms\Components\Select::make('category_id')->relationship('category', 'name')->required(),
            Forms\Components\Select::make('city_id')->relationship('city', 'name')->required(),
            Forms\Components\TextInput::make('title')->required()->maxLength(255),
            Forms\Components\Textarea::make('description')->required()->columnSpanFull(),
            Forms\Components\TextInput::make('price')->numeric()->required(),
            Forms\Components\TextInput::make('currency')->default('EUR')->maxLength(3),
            Forms\Components\TextInput::make('rooms')->numeric(),
            Forms\Components\TextInput::make('surface')->numeric(),
            Forms\Components\TextInput::make('address')->maxLength(255),
            Forms\Components\Select::make('status')
                ->options([
                    'draft' => 'Draft',
                    'pending' => 'Pending',
                    'approved' => 'Approved',
                    'rejected' => 'Rejected',
                ])
                ->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('city.name'),
            Tables\Columns\TextColumn::make('category.name'),
            Tables\Columns\TextColumn::make('price')->money('eur'),
            Tables\Columns\TextColumn::make('status')->badge(),
            Tables\Columns\TextColumn::make('created_at')->dateTime(),
        ])->actions([
            Tables\Actions\EditAction::make(),
        ])->bulkActions([
            Tables\Actions\BulkActionGroup::make([
                Tables\Actions\DeleteBulkAction::make(),
            ]),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => PropertyResource\Pages\ListProperties::route('/'),
            'create' => PropertyResource\Pages\CreateProperty::route('/create'),
            'edit' => PropertyResource\Pages\EditProperty::route('/{record}/edit'),
        ];
    }
}
