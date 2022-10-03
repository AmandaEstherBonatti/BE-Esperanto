// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { from, Observable, of } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import { Repository, UpdateResult } from 'typeorm';
// import { UsersEntity } from '../user/users.entity';
// import { FriendRequestDto } from './dto/friend-request.dto';
// import { FriendRequestEntity } from './friend-request.entity';


// @Injectable()
// export class FriendRequestService {
//   constructor(

//     @InjectRepository(FriendRequestEntity)
//     private readonly friendRequestRepository: Repository<FriendRequestEntity>,
//   ) {}


//   hasRequestBeenSentOrReceived(
//     creator: FriendRequestEntity,
//     receiver: FriendRequestEntity,
//   ): Observable<boolean> {
//     return from(
//       this.friendRequestRepository.findOne({
//         where: [
//           { Creator: receiver, Receiver: creator },
//         ],
//       }),
//     ).pipe(
//       switchMap((friendRequest: FriendRequestDto) => {
//         if (!friendRequest) return of(false);
//         return of(true);
//       }),
//     );
//   }

//   sendFriendRequest(
//     receiverId: string,
//     creator: UsersEntity,
//   ): Observable<FriendRequestDto | { error: string }> {
//     if (receiverId === creator.id)
//       return of({ error: 'It is not possible to add yourself!' });

//     return this.findUserById(receiverId).pipe(
//       switchMap((receiver: User) => {
//         return this.hasRequestBeenSentOrReceived(creator, receiver).pipe(
//           switchMap((hasRequestBeenSentOrReceived: boolean) => {
//             if (hasRequestBeenSentOrReceived)
//               return of({
//                 error:
//                   'A friend request has already been sent of received to your account!',
//               });
//             let friendRequest: FriendRequest = {
//               creator,
//               receiver,
//               status: 'pending',
//             };
//             return from(this.friendRequestRepository.save(friendRequest));
//           }),
//         );
//       }),
//     );
//   }

//   getFriendRequestStatus(
//     receiverId: number,
//     currentUser: User,
//   ): Observable<FriendRequestStatus> {
//     return this.findUserById(receiverId).pipe(
//       switchMap((receiver: User) => {
//         return from(
//           this.friendRequestRepository.findOne({
//             where: [
//               { creator: currentUser, receiver: receiver },
//               { creator: receiver, receiver: currentUser },
//             ],
//             relations: ['creator', 'receiver'],
//           }),
//         );
//       }),
//       switchMap((friendRequest: FriendRequest) => {
//         if (friendRequest?.receiver.id === currentUser.id) {
//           return of({
//             status: 'waiting-for-current-user-response' as FriendRequest_Status,
//           });
//         }
//         return of({ status: friendRequest?.status || 'not-sent' });
//       }),
//     );
//   }

//   getFriendRequestUserById(friendRequestId: number): Observable<FriendRequest> {
//     return from(
//       this.friendRequestRepository.findOne({
//         where: [{ id: friendRequestId }],
//       }),
//     );
//   }

//   respondToFriendRequest(
//     statusResponse: FriendRequest_Status,
//     friendRequestId: number,
//   ): Observable<FriendRequestStatus> {
//     return this.getFriendRequestUserById(friendRequestId).pipe(
//       switchMap((friendRequest: FriendRequest) => {
//         return from(
//           this.friendRequestRepository.save({
//             ...friendRequest,
//             status: statusResponse,
//           }),
//         );
//       }),
//     );
//   }

//   getFriendRequestsFromRecipients(
//     currentUser: User,
//   ): Observable<FriendRequest[]> {
//     return from(
//       this.friendRequestRepository.find({
//         where: [{ receiver: currentUser }],
//         relations: ['receiver', 'creator'],
//       }),
//     );
//   }

//   getFriends(currentUser: User): Observable<User[]> {
//     return from(
//       this.friendRequestRepository.find({
//         where: [
//           { creator: currentUser, status: 'accepted' },
//           { receiver: currentUser, status: 'accepted' },
//         ],
//         relations: ['creator', 'receiver'],
//       }),
//     ).pipe(
//       switchMap((friends: FriendRequest[]) => {
//         let userIds: number[] = [];

//         friends.forEach((friend: FriendRequest) => {
//           if (friend.creator.id === currentUser.id) {
//             userIds.push(friend.receiver.id);
//           } else if (friend.receiver.id === currentUser.id) {
//             userIds.push(friend.creator.id);
//           }
//         });

//         return from(this.userRepository.findByIds(userIds));
//       }),
//     );
//   }
// }
