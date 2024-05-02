import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { MembersModule } from './members/members.module';
import { AuthsModule } from './auths/auths.module';
import { AdminsModule } from './admins/admins.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CommentsModule } from './comments/comments.module';
import { NonMemberBoardsModule } from './non-member-boards/non-member-boards.module';

@Module({
  imports: [MembersModule, AuthsModule, AdminsModule, CategoriesModule, ProductsModule, OrdersModule, CommentsModule, NonMemberBoardsModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
