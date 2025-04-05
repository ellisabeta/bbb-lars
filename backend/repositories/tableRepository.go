package repositories

import (
	"bbb-lars/entities"
	"context"
)

type TableRepository interface {
	CreateTable(ctx context.Context, task entities.Table) error
}
